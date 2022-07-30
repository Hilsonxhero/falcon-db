import { ref } from 'vue'
export default function (event: any) {
    const data = ref<any>(null)
    const file = event.target.files[0]

    const reader = new FileReader()
    reader.onload = (image: any) => {
        data.value = image.target.result
    }

    reader.readAsDataURL(file)

    return data

}