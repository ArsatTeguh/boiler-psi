import { withAuth } from "@/utils/withAuth"

 function DeveloperPage() {
    return <>developer</>
}

export default withAuth(['developer'], DeveloperPage)