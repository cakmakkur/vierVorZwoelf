import axiosPublic from "@/utils/axiosPublic"

export async function GET() {
  try {
    const response = await fetch("https://api.restful-api.dev/objects")
    const data = await response.json()
    return new Response(JSON.stringify(data))
  }
  catch (err) {
    console.log(err)
  }
}