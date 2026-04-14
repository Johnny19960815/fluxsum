from typing import Optional
from fastapi import HTTPException, Header, status
import httpx


async def verify_token(authorization: str = Header(...)) -> dict:
    """验证 JWT Token"""
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header format",
        )
    
    token = authorization.replace("Bearer ", "")
    
    # 调用中央 SSO 服务验证 Token
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                "http://hub-central-server:8080/sso/userinfo",
                headers={"Authorization": f"Bearer {token}"},
            )
            if response.status_code != 200:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid or expired token",
                )
            return response.json()
        except httpx.RequestError:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="SSO service unavailable",
            )


async def get_current_user(authorization: Optional[str] = Header(None)) -> Optional[dict]:
    """获取当前用户信息（可选）"""
    if not authorization:
        return None
    try:
        return await verify_token(authorization)
    except HTTPException:
        return None
