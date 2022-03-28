<script>
import HelloWorld from './components/HelloWorld.vue'
import io from 'socket.io-client'

const socket = io('http://localhost:3000')

socket.on('rooms', (data) => {
  console.log(data)
})

export default ({
  data(){
    return {
      count: 0,
      name: ''
    }
  },
  methods: {
    cerateRoom(){
      console.log('raaaapaaaiizz')
      socket.nickname = this.name
      socket.emit('createRoom', {name: this.name})
    }
  }
})

</script>

<template>
  <h1>Testes iniciais Socket Io</h1>
  <input v-model="name">
  <button @click="cerateRoom()">Criar Sala</button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
