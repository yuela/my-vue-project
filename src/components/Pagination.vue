<template>
  <div class="pagination">
    <ul class="page-list">
      <li v-show="current!==1" @click="pre"><a><<</a></li>
      <li v-for="index in all" @click="indexPage(index)" :key="index"><router-link :to="`/videolist?p=${index}`" :class="{ checked: current===index }">{{ index }}</router-link></li>
      <li v-show="current!==all"><a @click="next">>></a></li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
    export default {
        name: "Pagination",
      computed: {
        ...mapState({
          current: state => state.current,
          all: state => state.all
        })
      },
      methods: {
        pre () {
          this.$store.state.current--;
        },
        indexPage (index) {
          this.$store.state.current = index;
        },
        next () {
          this.$store.state.current++;
        }
      }
    }
</script>

<style scoped lang="scss">
  @import '../assets/css/public.scss';

  .pagination {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .page-list {
    width: 100%;

  li {
    background: #eee;
    color: #666;
    border-radius: 5px;
    list-style-type: none;
  }

  a {
    cursor: pointer;
    display: block;
    padding: .8rem 1.3rem;
    border-radius: 5px;
    outline: none;
    color: #666;
  }

  .checked {
    background: red;
    color: white;
  }
  }
</style>
