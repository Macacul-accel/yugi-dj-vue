<script setup>
const props = defineProps({
    toastId: String,
    toastColor: String,
    toastMsg: String,
})
</script>

<template>
    <div class="position-fixed bottomo-0 end-0 p-3">
        <div
            class="toast border-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            :id="toastId"
            :class="toastColor"
        >
            <div class="d-flex">
                <div class="toast-body">
                    {{ toastMsg }}
                </div>
                <button
                    type="button"
                    class="btn-close button close-white me-2 m-auto" 
                    data-bs-dismiss="toast"
                    aria-label="Close"
                ></button>
            </div>
        </div>
    </div>
</template>