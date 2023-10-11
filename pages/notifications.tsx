import { NextPageContext } from "next"
import { getSession } from "next-auth/react"

import Header from "@/components/Header"

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/', 
                permanent: false, 
            }
        }
    }

    return {
        props: {
            session
        }
    }

}

const notifications = () => {
  return (
    <>
        <Header label="Notifications" showBackArrow  />
    </>
  )
}

export default notifications