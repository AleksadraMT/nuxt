export default {
  methods: {
    getCollectionName(item, flag) {
      switch (item.toLowerCase()) {
        case 'private':
          return 'privat'

        case 'corporate':
          return flag === 'url' ? 'foretag' : 'företag'
      }
    }
  }
}
