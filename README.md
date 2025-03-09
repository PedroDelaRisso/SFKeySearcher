# SFKeySearcher
SoulFrame key searcher.

A quick project done using Vite, Deno, TypeScript, Axios, React and Tailwindcsss. This app consumes the reddit API to search for comments on the [subreddit r/SoulFrame code sharing megathread](reddit.com/r/SoulFrame/comments/1ih1iit) and prints them on screen if they contain SoulFrame keys.

# ⚠️ Disclaimer
This repo exists only to facilitate finding comments containing keys, it ***does not*** generate valid codes and doing so is against SoulFrame's terms of service and I do not condone or encourage it.

# Instructions
- Create a reddit app ([this YouTube video guides you through the process](https://youtu.be/KmFKO1dp_vQ))
- Install [Deno](https://deno.com)

After creating your reddit app, you can run the repo.

## Running

You need to have [Deno](https://deno.com) v2.0.0 or later installed to run this repo.

Start a dev server:

```
$ deno task dev
```

It'll usually run at [localhost:5173](http://localhost:5173)

## Logging into the reddit API using the interface
Once you load the app, you'll be greeted by a screen with a button labeled "Search". Click it and it'll prompt you to login:
![image](https://github.com/user-attachments/assets/1f89332a-812c-4875-879e-d338beabfc60)

Login to reddit. The ClientId and Secret can be found [here](https://www.reddit.com/prefs/apps).:
![image](https://github.com/user-attachments/assets/c39240f6-1e60-4de5-8520-f9dbe4ab14b8)

After this you're done! Don't forget to clear the session storage by pressing the button on the page's footer.


