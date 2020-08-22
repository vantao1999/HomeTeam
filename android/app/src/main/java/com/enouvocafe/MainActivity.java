package com.enouvocafe;

import com.reactnativenavigation.NavigationActivity;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.ImageView;
import android.view.Gravity;
import android.os.Bundle; 
import android.graphics.Color;

public class MainActivity extends NavigationActivity {
    ///
    @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(this.createSplashLayout());
  }

  public LinearLayout createSplashLayout() {
    // LinearLayout splash = new LinearLayout(this);
    // Drawable launch_screen_bitmap = ContextCompat.getDrawable(getApplicationContext(), R.drawable.launch_screen);
    // splash.setBackground(launch_screen_bitmap);
    LinearLayout view = new LinearLayout(this);
        TextView textView = new TextView(this);
        ImageView imageView = new ImageView(this);
        view.setGravity(Gravity.CENTER);
        String splashScreenBackgroundColor = "#ffffff";
    view.setBackgroundColor(Color.parseColor(splashScreenBackgroundColor));

        imageView.setImageResource(R.drawable.logo);
        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(360, 360);
        imageView.setLayoutParams(layoutParams);

        view.addView(imageView);

    return view;
  }
}

