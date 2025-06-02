import { TabsTrigger } from "@/components/atoms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"

export const TabsList = ({
  list,
  activeTab,
}: {
  list: { label: string; link: string }[]
  activeTab: string
}) => {
  return (
    <div className="flex gap-4 w-full">
      {list.map(({ label, link }) => (
        <LocalizedClientLink key={label} href={link}>
          <TabsTrigger isActive={activeTab === label.toLowerCase()}>
            {label}
          </TabsTrigger>
        </LocalizedClientLink>
      ))}
    </div>
  )
}
