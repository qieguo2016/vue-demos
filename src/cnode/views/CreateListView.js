import TopicList from '../components/TopicList.vue'

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export function createListView (type) {
  return {
    name: `${type}-view`,
    // this will be called during SSR to pre-fetch data into the store!
    render (h) {
      return h(TopicList, { props: { type }})
    }
  }
}
