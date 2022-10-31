<template>
  <InstantSearch :search-client="searchClient" index-name="instant_search">
    <div class="search-panel">
      <div class="search-panel__filters">
        <RefinementList attribute="brand" />
      </div>

      <div class="search-panel__results">
        <div class="searchbox">
          <SearchBox placeholder="" />
        </div>
        <StateResults>
          <template #default="{ results: { hits } }">
            <Hits>
              <template v-slot:item="{ item }">
                <!-- <p>{{ item }}</p> -->
                <h1>
                  <Highlights :hit="item" attribute="name" />
                </h1>
                <p>
                  <Highlights :hit="item" attribute="description" />
                </p>
              </template>
            </Hits>
            <div>
              <p>Aucun résultat</p>
            </div>
          </template>
        </StateResults>

        <div class="pagination">
          <Pagination :show-first="false" :show-last="false" :padding="1" />
        </div>
      </div>
    </div>
  </InstantSearch>
</template>

<script setup lang="ts">
import algoliasearch from 'algoliasearch/lite.js';
import InstantSearch from 'vue-instantsearch/vue3/es/src/components/InstantSearch.js';
import SearchBox from 'vue-instantsearch/vue3/es/src/components/SearchBox.vue';
import RefinementList from 'vue-instantsearch/vue3/es/src/components/RefinementList.vue';
import StateResults from 'vue-instantsearch/vue3/es/src/components/StateResults.vue';
import Hits from 'vue-instantsearch/vue3/es/src/components/Hits.vue';
import Pagination from 'vue-instantsearch/vue3/es/src/components/Pagination.vue';
import Highlights from 'vue-instantsearch/vue3/es/src/components/Highlight.vue';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);
</script>
