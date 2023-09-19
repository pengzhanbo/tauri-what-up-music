import cn from 'classnames'
import { useMatch } from 'react-router-dom'
import { usePageNavigate } from '~/hooks'

function NavLink({ link, text }: NavLinkProps) {
  const pathMath = useMatch({ path: link, caseSensitive: true, end: false })
  const className = cn(
    'text-text decoration-none select-none cursor-pointer transition-colors duration-300',
    'font-500 hover:text-text-darker hover:font-semibold',
    {
      'text-text-darker font-semibold': pathMath,
    },
  )
  const { navigate } = usePageNavigate()
  const mousedown = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
  }
  return (
    <p className="ml-8">
      <a
        className={className}
        onMouseDown={mousedown}
        onClick={() => navigate(link)}
      >
        {text}
      </a>
    </p>
  )
}

export interface NavLinkProps {
  link: string
  text: string
  active?: boolean
}

export default NavLink
