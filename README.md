# stream-shoutout-overlay
Custom made shoutout overlay for twitch stream


<img src="./documentation/image/promotion.jpg" width="400">


# Preview
Youtube video

[![Click to redirect to youtube](https://img.youtube.com/vi/YIm7S8_mzm4/0.jpg)](https://www.youtube.com/watch?v=YIm7S8_mzm4)

# How to use
## Setup in OBS
Add browser source with URL: 
https://recordlight.github.io/shoutout-overlay/?channel=[Your channel name]

For example https://recordlight.github.io/shoutout-overlay/?channel=recordlight

<img src="./documentation/image/instruction.jpg" width="400">

## Chat
Typed in !so/!shoutout/!mso in your channel chat to trigger the widget.
```
!so recordlight
```

You can also typed in multiple names at the same line. It will queue in the widget. Do take note that this only trigger the widgets and not your streamelements.
```
!so recordlight recorddark recordbot
```



# Customization
As of current version. You can change the color by utilizing the custom CSS part of the browsersource. To change the color of the box, you can add
```
.dialog {
     background-color: #(the six digit color you want)
}
```

The dashed dot color can be changed by adding this to the custom css part as well
```
.inner-dialog {
     border-color: #(the six digit color you want)
}
```

Changing text color 
```
.text-area {
     color: #(the six digit color you want)
}
```


<img src="./documentation/image/customization.png" width="400">

# Additional note
I would appreciate if you could put recordlight as credit (or twitch.tv/recordlight or twitter.com/recordlight_) when using the widget.

<a href="https://twitch.tv/recordlight" alt="my twitch channel"><img src="./documentation/image/visittwitch.png" width="250"></a>

# Change Log
| Date  | Change |
| ------------- | ------------- |
| 3/17/2023  | Code optimization, improved clip picking algorithm, enable easier change of text style  |
| 3/18/2023  | Bug fix just to enable only mods and broadcaster to trigger the so. Also added the !shoutout command. Also enable multiple so (like !so recordlight recorddark ...)  |

# Thank you