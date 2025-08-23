import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

const AppPage = () => {


  const [cause, setCause] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)


  const handleSend = async () => {
    setLoading(true)
    setResult("")
    toast.loading("Getting Suggestions from AI")

    if (!cause.trim()) {
      toast.dismiss()
      toast.error("Cause / Disease is Empty")
      setLoading(false)
      setResult("")
    }
    else {
      try {
        const res = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `I'm building a health guidance app. Write a simple, safe, and clear guide for home therapy for ${cause}.
              The guide should:
              -Start with a disclaimer ("I'm not a doctor…") (This is must)
              -Use emoji-based section titles (🌿, 🛌, 🚿, etc.)
              -Provide 4-6 practical, safe home remedies in bullet/step form
              -End with a ⚠️ Important note on when to seek medical help
              -Keep the tone friendly, supportive, and easy to understand.`
            }
          ]
        }, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173/app"
          }
        }
        )
        setResult(res.data.choices[0].message.content);
        toast.dismiss();
        toast.success(`Home Therapy for ${cause}`)
      } catch (err) {
        toast.dismiss()
        toast.error("Failed to generate. Check API key or headers")
      } finally {
        setLoading(false)
        setCause("")
      }
    }

  }


  return (
    <div>
      <div className='min-h-screen bg-gradient-to-b from-lime-300 to-lime-200 px-4 py-10'>
        <div className='max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8'>
          <h1 className='text-4xl text-gray-800 font-bold text-center mb-10'>AI MediGuide⚕️</h1>


          <div className='max-w-xl mx-auto flex gap-5 mb-10'>
            <input type="text"
              placeholder='Enter your Causes or Disease (e.g: Fever, Headache..)'
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              className='w-full px-4 py-2 rounded-md border border-gray-400 shadow-sm' />

            <button className='bg-gray-950 text-white  px-6 py-2 rounded-md hover:bg-gray-900 font-bold cursor-pointer shadow' onClick={handleSend}>
              {loading ? (
                <>
                  <Loader2 size={16} strokeWidth={4} className='animate-spin' />
                </>
              )

                :
                "Send"
              }
            </button>
          </div>


          {result && (
            <div className='mt-10'>
              <h2 className='text-xl font-bold mb-3'>
                Here's your Home Therapy:
              </h2>

              <div className='border-2 p-5 rounded-lg whitespace-pre-line text-lg font-sans font-semibold'>
                {result}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>

  )
}

export default AppPage
