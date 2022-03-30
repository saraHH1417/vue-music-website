<template>
      <!-- Music Header -->
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
      style="background-image: url(/assets/img/song-header.png)">
    </div>
    <div class="container mx-auto flex items-center">
      <!-- Play/Pause Button -->
      <button type="button" class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full
        focus:outline-none">
        <i class="fas fa-play"></i>
      </button>
      <div class="z-50 text-left ml-8">
        <!-- Song Info -->
        <div class="text-3xl font-bold">{{ song.modified_name }}</div>
        <div>{{ song.genra }}</div>
      </div>
    </div>
  </section>

  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">Comments (15)</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <!-- Form -->
        <add-song-comment/>
        <!-- Sort Comments -->
        <select
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded">
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>
      </div>
    </div>
  </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <list-song-comment v-for="comment in comments" :key="comment.docID" />
    </ul>
</template>

<script>
import { songsCollection, doc, getDoc } from '@/includes/firebase';
import ListSongComment from '@/components/ListSongComment.vue';
import AddSongComment from '@/components/AddSongComment.vue';

export default {
  name: 'SongView',
  components: {
    ListSongComment,
    AddSongComment,
  },
  data() {
    return {
      song: {},
    };
  },
  async created() {
    const docRef = await doc(songsCollection, this.$route.params.id);
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) {
      await this.$router.push({ name: 'home' });
      return;
    }
    this.song = docSnapshot.data();
  },
};
</script>
