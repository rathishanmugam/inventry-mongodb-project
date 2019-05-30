<template>
  <div>
    <h1>Browse Company</h1>
    <ul class="menu">
      <li>
        <router-link :to="{name: 'BrowseSony'}">Sony</router-link>
      </li>
      <li>
        <router-link :to="{name: 'BrowseLG'}">LG</router-link>
      </li>
      <li>
        <router-link :to="{name: 'BrowseSamsang'}">Samsang</router-link>
      </li>
      <li>
        <router-link :to="{name: 'BrowseViedocon'}">Viedocon</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'BrowseCompany',
  };
</script>

<style scoped>
  h1 {
    text-align: center;
  }
  .menu {
    display: flex;
    justify-content: space-around;
    margin: 0 100px;
    font-size: 20px;
  }
  ul {
    list-style-type: none;
  }
  a {
    color: palevioletred;
  }
</style>
