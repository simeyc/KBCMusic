package com.kbcmusic;

import android.os.Bundle; // required for bootsplash
import com.facebook.react.ReactActivity;
import com.zoontek.rnbootsplash.RNBootSplash; // required for bootsplash

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "KBCMusic";
  }

  // override onCreate() required to overlay bootsplash on main activity
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    RNBootSplash.show(R.drawable.bootsplash, MainActivity.this); // required for bootsplash
  }
}
