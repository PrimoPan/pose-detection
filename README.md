# Pose-Detection Demos in Web

**Author : Primo**

This package involves some demos I collected that using state-of-the-art models for running real-time pose detection
in your browser.

*Hint: Since most of models in the package are trained by Google,make sure that you are able to bypass the GFW.*

Before we start, let's give a brief introduction to the principle of pose-detection technology in web browsers.
<br>

Above all, every ingenious effect achievement in this package is realized by machine learning.In brief, machine learning is a method that you make the computer understand something by teaching it something.You tell the computer that 'A' is 'A' and "B" isn't 'A' many many many times by delivering countless data to the computer,and we call it 'Dataset'.Then the computer will learn the *Dataset* via some algorithms.After the learning process, if you give the computer some information,it will classify them.And then it can tell you "A" is  "A' with a great probability.

<img src="./img/001.pic.jpg"/>

These days, we have many platforms to  create machine learning models.**Tensorflow(Google)** and **Pytorch(Facebook/Meta)** are popular ones among them.Both of them require **Python** skills to create and apply models.To **Digital Art Designers/Game Developers/Software Engineers(especially Front-End Engineers)** who do not have enough mathematic and Python-Programming skills,nevertheless,those platforms have steep learning curve.

To make machine-learning skills easier for developers,Google released a Javascript library **Tensorflow.js**.It makes it possible for us to create machine learning models in Javascript.
### 01-Posenet in P5.js
