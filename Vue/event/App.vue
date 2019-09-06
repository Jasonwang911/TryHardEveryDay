<template>
 <div id="app">
   <ul>
     <li v-for="route in routes" :key="route.name">
       <router-link :to="route.path">{{route.meta.title}}</router-link>
     </li>
   </ul>
   <router-view></router-view>
 </div>
</template>

<script>
import {routes} from './router.js'

export default {
  data() {
    return {
      routes
    };
  }
};
</script>
