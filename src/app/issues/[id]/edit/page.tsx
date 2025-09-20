import React from 'react'
import IssueForm from '../../_elements/IssueForm'
import prisma from '../../../../../prisma/client'
interface Props {
    params : {id: string}
}
const EditIssue = async ({params} : Props) => {
    const issue = await prisma.issue.findUnique({
        where: {id: params.id}
    })
  return (
    <div>
        <IssueForm issue={issue}/>
    </div>
  )
}

export default EditIssue