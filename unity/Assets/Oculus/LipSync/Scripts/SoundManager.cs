using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

public class SoundManager : MonoBehaviour
{
    private AudioClip Sound;
    private AudioSource audio;
    private bool isAudioEnd;

	void Start()
	{
        var args = System.Environment.GetCommandLineArgs();
        using(WWW www = new WWW("file://" + args[1]))
        {
            Sound = www.GetAudioClip(false, true);
            audio = GetComponent<AudioSource>();
            audio.clip = Sound;
            isAudioEnd = false;
        }
        audio.Play();
	}

    void Update()
    { 
        if(!audio.isPlaying){
            Application.Quit();
        }
    }
}