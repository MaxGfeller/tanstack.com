import * as React from 'react'
import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { DocTitle } from '~/components/DocTitle'
import { v3branch } from '~/routes/virtual/v3'
import { seo } from '~/utils/seo'
import { capitalize, slugToTitle } from '~/utils/utils'

export const loader: LoaderFunction = async (context) => {
  const { '*': examplePath } = context.params
  const [kind, name] = (examplePath ?? '').split('/')

  return json({ kind, name })
}

export let meta: MetaFunction = ({ data }) => {
  return seo({
    title: `${capitalize(data.kind)} Virtual ${slugToTitle(
      data.name
    )} Example | TanStack Virtual Docs`,
    description: `An example showing how to implement ${slugToTitle(
      data.name
    )} in ${capitalize(data.kind)} Virtual`,
  })
}

export default function RouteReactTableDocs() {
  const { kind, name } = useLoaderData()

  const examplePath = [kind, name].join('/')

  const [isDark, setIsDark] = React.useState(true)

  React.useEffect(() => {
    setIsDark(window.matchMedia?.(`(prefers-color-scheme: dark)`).matches)
  }, [])

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-auto">
      <div className="p-4 lg:p-6">
        <DocTitle>
          {capitalize(kind)} Example: {slugToTitle(name)}
        </DocTitle>
      </div>
      <div className="flex-1 lg:ml-6 flex flex-col min-h-0">
        <iframe
          src={`https://codesandbox.io/embed/github/tanstack/virtual/tree/${v3branch}/examples/${examplePath}?autoresize=1&fontsize=14&theme=${
            isDark ? 'dark' : 'light'
          }`}
          title={`tanstack/virtual: ${examplePath}`}
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          className="flex-1 w-full overflow-hidden lg:rounded-l-2xl shadow-xl shadow-gray-700/20 bg-white dark:bg-black"
        />
      </div>
      <div className="h-16 lg:mt-2" />
    </div>
  )
}
