<template>
      <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <upload-component  ref="upload"/>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item v-for="(song, index) in songs" :key="song.docID" 
              :song="song" 
              :updateSong="updateSong" 
              :index="index"
              :removeSong="removeSong"/>
          </div>  
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import store from '@/store';
import UploadComponent from '@/components/UploadComponent.vue';
import CompositionItem from '@/components/CompositionItem.vue';

import { 
  songsCollection, firebaseAuth, query, where, getDocs,
} from '@/includes/firebase';

export default {
  name: 'ManageView',
  components: {
    UploadComponent,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
    };
  },
  methods: {
    updateSong(index, values) {
      // this.songs[index].modified_name = values.modified_name;
      // this.songs[index].genra = values.genra;
      Object.keys(this.songs[index]).forEach((key) => {
        this.songs[index][key] = values[key];
      });
    },
    removeSong(index) {
      this.songs.splice(index, 1);
    },
  },
  async created() {
    const q = query(songsCollection, where('uid', '==', firebaseAuth.currentUser.uid));
    const snapshot = await getDocs(q);
    snapshot.forEach((document) => {
      const song = {
        ...document.data(),
        docID: document.id,
      };
      this.songs.push(song);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.upload.cancelUploads();
    next();
  },
  // beforeRouteEnter(to, from, next) {  
  //   if (store.state.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: 'home' });
  //   }
  // },
};
</script>
