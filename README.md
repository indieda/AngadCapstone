![Yale-NUS College Capstone Project](ync.png)

This project uses SDK 4.2
==========

INSTRUCTIONS:
--------------------

1. Open up the app
2. Press start, once the participant is ready to run on the treadmill
3. If the person needs to drink water or pause midway through, tap pause.
4. Press stop once the total workout time is beyond 30 minutes.
5. Copy down the timing of the vibrations upon scrolling down.
6. For another trial: Exit the app and start again.
7. To change conditions: exit the app, reopen the app and scroll down to cycle between "V", "NV", and "deb" conditions.
8. To access data: go to fitbit dashboard on web or phone to export data 


CONDITIONS:
---------------------
"V":
The first 10 minutes will run silently. After that, for every 2 minutes, a vibration will be delivered at a random time point, for a total of 10 times, at a total time of 30 minutes since the timer started.

"NV": Same as V, except no vibrations given.

"deb": Every 2 minutes, a vibration will be delivered at a random time point, for a total of 10 times, at a total time of 20 minutes since the timer started. There is no 10 minutes silence at the start.

To toggle between vibration and non-vibration mode
-----------------
Scroll down below for the button to toggle between V and NV conditions

[SDK4.2 documentation](https://web.archive.org/web/20200912173010/https://dev.fitbit.com/)


SDK 4.2 project tree:


- app

  - index.js
    
- companion

  - index.js
  
- resources

  - index.gui
  
  - widgets.gui
  
  - styles.css
  
  - icon.png
  
