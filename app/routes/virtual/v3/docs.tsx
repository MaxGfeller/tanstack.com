import * as React from 'react'
import { FaDiscord, FaGithub } from 'react-icons/fa'
import { Link, MetaFunction } from 'remix'
import { useReactVirtualV3Config } from '../v3'
import { gradientText } from './index'
import { seo } from '~/utils/seo'
import { Docs, DocsConfig } from '~/components/Docs'

const logo = (
  <>
    <Link to="/" className="font-light">
      TanStack
    </Link>
    <Link to=".." className={`font-bold`}>
      <span className={`${gradientText}`}>Virtual</span>{' '}
      <span className="text-sm align-super">v3</span>
    </Link>
  </>
)

const localMenu = {
  label: 'Menu',
  children: [
    {
      label: 'Home',
      to: '..',
    },
    {
      label: (
        <div className="flex items-center gap-2">
          Github <FaGithub className="text-lg opacity-20" />
        </div>
      ),
      to: 'https://github.com/tanstack/virtual',
    },
    {
      label: (
        <div className="flex items-center gap-2">
          Discord <FaDiscord className="text-lg opacity-20" />
        </div>
      ),
      to: 'https://tlinz.com/discord',
    },
  ],
}

export let meta: MetaFunction = () => {
  return seo({
    title:
      'TanStack Virtual Docs | React Virtual, Solid Virtual, Svelte Virtual, Vue Virtual',
    description:
      'Headless UI for virtualizing long scrollable lists with TS/JS, React, Solid, Svelte and Vue',
  })
}

export default function RouteReactTable() {
  let config = useReactVirtualV3Config()

  config = React.useMemo(
    () =>
      ({
        ...config,
        menu: [localMenu, ...config.menu],
      } as DocsConfig),
    [config]
  )

  return (
    <Docs
      {...{
        logo,
        colorFrom: 'from-teal-500',
        colorTo: 'to-blue-500',
        textColor: 'text-blue-500',
        config,
      }}
    />
  )
}
