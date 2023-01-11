import React, { useState,useEffect} from "react"

const SpeechRecognition = 
    window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

const Sample = () => {
    const handleListen = () => {
        mic.start()
        mic.onstart = () => {
            console.log('Mics on')
          }
          mic.onresult = event => {
            const transcript = Array.from(event.results)
              .map(result => result[0])
              .map(result => result.transcript)
              .join('')
            console.log(transcript)
            mic.onerror = event => {
              console.log(event.error)
            }
          }
    }
    handleListen()
}

export default Sample