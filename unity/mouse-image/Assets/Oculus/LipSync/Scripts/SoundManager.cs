using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

public class SoundManager : MonoBehaviour
{
    private AudioClip Sound;
    private AudioSource audio;
    public string path = "C:/Users/masahiro/voiceSample/Test.mp3";
    private bool isAudioEnd;
    private float totaltime;
    private int f=0;
    private float startSpanTime = 1f;
    private float endSpanTime = 0.3f;

	//string VoiceName = "Test";

	void Start()
	{
        using(WWW www = new WWW("file://" + path))
        {
            Sound = www.GetAudioClip(false, true);
            audio = GetComponent<AudioSource>();
            //audio.clip = Resources.Load<AudioClip>(VoiceName);
            audio.clip = Sound;
            isAudioEnd = false;
        }
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
            Application.Quit();
            //終了判定
        }
    }
}