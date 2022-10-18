using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

public class SoundManager : MonoBehaviour
{
    private AudioClip Sound;
    private AudioSource audio;
    private bool isAudioEnd;
    private float totaltime;
    private int f=0;
    private float startSpanTime = 1f;
    private float endSpanTime = 0.3f;

	string VoiceName = "Test";

	void Start()
	{
        audio = GetComponent<AudioSource>();
        audio.clip = Resources.Load<AudioClip>(VoiceName);
        isAudioEnd = false;
	}

    void Update()
    {
        totaltime += Time.deltaTime;
        if(totaltime > startSpanTime && f==0){
            audio.Play();
            isAudioEnd = true;
            f=1;
        }
        if(!audio.isPlaying && f==1){
            totaltime = 0;
            f=2;
        }
        if(!audio.isPlaying && isAudioEnd && totaltime > endSpanTime)
        {
            EditorApplication.isPlaying = false;
            //終了判定
        }
    }
}