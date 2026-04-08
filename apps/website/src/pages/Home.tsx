import { Button } from "@fluxsum/ui";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            一站式服务全球
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Fluxsum 为您提供全方位的解决方案，助力您的业务走向全球
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg">立即开始</Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/about">了解更多</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold">核心优势</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold">全球覆盖</h3>
              <p className="mt-2 text-muted-foreground">
                业务遍布全球，为您提供无缝的国际化服务
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold">安全可靠</h3>
              <p className="mt-2 text-muted-foreground">
                企业级安全保障，让您的数据安全无忧
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold">专业支持</h3>
              <p className="mt-2 text-muted-foreground">
                7x24 小时专业技术支持，随时为您服务
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
