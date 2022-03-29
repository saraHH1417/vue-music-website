<template>
      <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <upload-component  ref="upload" :addSong="addSong"/>
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
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"/>
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
      unsavedFlag: false,
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
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id,
      };
      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  async created() {
    const q = query(songsCollection, where('uid', '==', firebaseAuth.currentUser.uid));
    const snapshot = await getDocs(q);
    snapshot.forEach(this.addSong);
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      this.$refs.upload.cancelUploads();
      next();
    } else {
      // eslint-disable-next-line no-alert, no-restricted-globals
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?');
      if (leave) {
        this.$refs.upload.cancelUploads();
        next();
      }
    }
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
