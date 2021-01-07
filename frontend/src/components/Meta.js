import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>ProShop | {title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Home',
  keywords: 'electronics, buy electronics, cheap electronics',
  description: 'Quality products for cheap!',
}

export default Meta
