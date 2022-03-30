<template>
  <form >
    <label for="comment_text" class="hidden"></label>
    <textarea
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
        duration-500 focus:outline-none focus:border-black rounded mb-4"
        placeholder="Your comment here..." id="comment_text"></textarea>
    <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600 block">
      Submit
    </button>
  </form>
</template>

<script>
export default {
  name: 'AddSongComment',

};
</script>
