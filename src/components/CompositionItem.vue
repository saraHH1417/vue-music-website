<template>
  <div class="border border-gray-200 p-4 mb-4 rounded">
    <div v-show="!showForm" class="flex flex-row">
        <div class="basis-5/6">
            <p class="inline-block text-xl font-bold">{{ song.modified_name }}</p>
        </div>
        <div class="basis-1/6">    
            <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
              @click="deleteSong()">
                <i class="fa fa-times"></i>
            </button>
            <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
              @click.prevent="showForm = !showForm">
                <i class="fa fa-pencil-alt"></i>
            </button>
        </div>    
    </div>
    <div>
      <div class="text-white text-center font-bold p-4 mb-4" v-if="show_alert"
        :class="alert_variant">
        {{ alert_message }}
      </div>
      <vee-form v-show="showForm" :validation-schema="schema" :initial-values="song"
        @submit="edit">
        <div class="mb-3">
        <label class="inline-block mb-2" for="song-title">Song Title</label>
        <vee-field type="text" name="modified_name"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
            transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title" 
            id="song-title"
            @input="updateUnsavedFlag(true)"/>
        <ErrorMessage class="text-red-600" name="modified_name"/>    
        </div>
        <div class="mb-3">
        <label class="inline-block mb-2" for="song-genra">Genre</label>
        <vee-field type="text" name="genra"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
            transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre" 
            id="song-genre"
            @input="updateUnsavedFlag(true)"/>
        <ErrorMessage class="text-red-600"  name="genra"/>    
        </div>
        <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="in_submission">
        Submit
        </button>
        <button type="button" class="py-1.5 px-3 rounded text-white bg-gray-600" 
          :disabled="in_submission" @click.prevent="goBack()">
        Go Back
        </button>
      </vee-form>
    </div>
  </div>   
</template>

<script>
import { 
  songsCollection, doc, updateDoc, firebaseStorage, ref, deleteObject, deleteDoc,
} from '@/includes/firebase';

export default { 
  name: 'CompositionItem',
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
    },
  },
  data() {
    return {
      showForm: false,
      schema: {
        modified_name: 'required',
        genra: 'alpha_spaces',
      },
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_message: 'Please wait. Updating song info!',
    };
  },
  methods: {
    async edit(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = 'bg-blue-500';
      this.alert_message = 'Please wait. Updating song info!';
      
      const songDoc = doc(songsCollection, this.song.docID);
      try {
        await updateDoc(songDoc, values);
      } catch (error) {
        this.in_submission = false;
        this.show_alert = false;
        this.alert_variant = 'bg-red-500';
        this.alert_message = 'Somnething wet wrong! TRy again Later.';
        return;
      }
      this.updateSong(this.index, values);
      this.updateUnsavedFlag(false);
      this.in_submission = false;
      this.alert_variant = 'bg-green-500';
      this.alert_message = 'Success!';
    },
    goBack() {
      this.showForm = false;
      this.show_alert = false;
    },
    async deleteSong() {
      const songRef = ref(firebaseStorage, `songs/${this.song.original_name}`);
      await deleteObject(songRef);
      const songDoc = doc(songsCollection, this.song.docID);
      await deleteDoc(songDoc); 
      this.removeSong(this.index);
    },
  },
};
</script>
