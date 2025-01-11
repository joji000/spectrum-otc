import TheMainHeader from "@/components/layouts/TheMainHeader"



interface Props {
  children: React.ReactNode
}
export default function HomeLayout({ children }: Props) {
  return (
      <>
      <TheMainHeader/>
        {children}
      </>
      
  )
}
