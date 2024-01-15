import React from 'react'
import Layout from '../../src/components/layout/Layout'
import { Card } from '@mui/material'
import List from './List'
import useDiscussions from './useDiscussions'
import Recommendations from './Recommendations'

const Discuciones = () => {
  const image = ''
  const descripcion = ''
  const title = 'Discuciones'
  const url = 'discuciones'

  const { discussionsList } = useDiscussions()

  return (
    <Layout image={image} descripcion={descripcion} title={title} url={url}>
      <Card>
        <List discussionsList={discussionsList} />
      </Card>
      <Card>
        <Recommendations />
      </Card>
    </Layout>
  )
}

export default Discuciones
