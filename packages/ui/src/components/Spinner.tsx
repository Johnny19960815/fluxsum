import { Loader2Icon } from 'lucide-react'
import { cn } from '../lib/utils'

function Spinner({ className, ...props }: React.SVGAttributes<SVGSVGElement>) {
  return <Loader2Icon role="status" aria-label="Loading" className={cn('h-4 w-4 animate-spin', className)} {...props} />
}

export { Spinner }
