<template>
  <div class="home">
    <div>
      Home Appliance
    </div>
    <ul>
      <li>
    <div class="get-started">
      <router-link class="nav-link" :to="{name: 'Product'}" exact>
      <a href=" ">Get started</a>  </router-link>
    </div> </li>
      <li>
      <router-link class="nav-link" :to="{name: 'BrowseSamsang'}" exact>
        <a href=" ">Samsang</a>  </router-link>
      </li>
      <li>
      <router-link class="nav-link" :to="{name: 'BrowseLG'}" exact>
        <a href=" ">LG</a>  </router-link>
      </li>
      <li>
      <router-link class="nav-link" :to="{name: 'BrowseSony'}" exact>
        <a href=" ">Sony</a>  </router-link>
      </li>
      <li>
      <router-link class="nav-link" :to="{name: 'BrowseViedocon'}" exact>
        <a href=" ">Viedocon</a>  </router-link>
  </li>
  </ul>
  </div>
</template>

<script>
  // eslint-disable-next-line
  /* eslint-disable */
  export default {
    name: 'HomePage',
    props: {
      msg: String,
    },

  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
    text-align: center;
    display: block;
  }
  ul{
    list-style-type: none;
    text-decoration:none;
  }

  .robot {
    height: 300px;
  }
  .get-started {
    padding-top: 20px;
    font-size: 25px;
  }
  .samsang {
    padding-top: 20px;
    font-size: 25px;
  }
</style>
