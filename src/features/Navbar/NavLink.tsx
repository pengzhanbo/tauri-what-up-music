import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

function NavLink({ link, text, active }: NavLinkProps) {
  const className = cn(
    'text-text decoration-none select-none cursor-pointer transition-colors duration-300',
    'font-500 hover:text-text-darker hover:font-semibold',
    {
      'text-text-darker font-semibold': active,
    },
  )
  const navigate = useNavigate()
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
