import { ref } from 'vue'
export default function (event: any) {
    let data = ref(null)
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (image: any) => {
        data.value = image.target.result?.toString()
    }
    reader.readAsDataURL(file)
    return data
}

// export default function (file: File): Promise<string> {
//     return new Promise<string>((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result?.toString() || '');
//         reader.onerror = error => reject(error);
//     })
// }

// export default file2Base64