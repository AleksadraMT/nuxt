export default {
  methods: {
    getCollectionName(item, flag) {
      switch (item.toLowerCase()) {
        case 'private':
          return 'privat'

        case 'corporate':
          return flag === 'url' ? 'foretag' : 'företag'
      }
    },
    metaData(data) {
      const { title, logo, description } = data

      return {
        title,
        link: [
          {
            rel: 'icon',
            type: 'image/x-icon',
            href: logo
          }
        ],
        meta: [
          {
            hid: 'description',
            id: 'description',
            name: 'description',
            content: description
          },
          { property: 'og:url', content: 'http://leaseonline.se/' },
          { property: 'og:locale', content: 'sv_SE' },
          { property: 'og:type', content: 'website' },
          { property: 'og:title', content: title },
          { property: 'og:description', content: description },
          { property: 'og:site_name', content: title },
          { itemprop: 'name', content: title },
          {
            itemprop: 'description',
            content: description
          }
        ]
      }
    }
  }
}
