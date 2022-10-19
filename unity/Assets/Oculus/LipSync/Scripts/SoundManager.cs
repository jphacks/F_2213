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

    void awake()
    {
        Application.targetFrameRate = 60;
    }

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