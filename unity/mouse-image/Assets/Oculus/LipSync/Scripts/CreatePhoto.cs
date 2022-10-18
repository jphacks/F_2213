using UnityEngine;
using System.Collections;
using System.IO;

public class CreatePhoto : MonoBehaviour {

    public RenderTexture RenderTextureRef;
    public int count=1;
    private float totaltime;

    // Use this for initialization
    void Start () {
        RenderTexture RenderTextureRef = this.gameObject.GetComponent<Camera>().activeTexture;
	}
	
	// Update is called once per frame
	void Update () {
        totaltime += Time.deltaTime;
        if(totaltime > 1f){
            savePng();
        }
    }

    void savePng()
    {
        Texture2D tex = new Texture2D(RenderTextureRef.width, RenderTextureRef.height, TextureFormat.RGB24, false);
        RenderTexture.active = RenderTextureRef;
        tex.ReadPixels(new Rect(0, 0, RenderTextureRef.width, RenderTextureRef.height), 0, 0);
        tex.Apply();

        // Encode texture into PNG
        byte[] bytes = tex.EncodeToPNG();
        Object.Destroy(tex);

        //Write to a file in the project folder
        File.WriteAllBytes(Application.dataPath + "/../SaveMouse/SavedMouse" + count + ".png", bytes);
        count += 1;
    }


}