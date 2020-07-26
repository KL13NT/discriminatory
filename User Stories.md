# User Stories

This document specifies possible user-stories in the full version, with indication as to which features will land in initial alpha releases. Stories marked as "Alpha" are to land in alpha releases, and stories marked "Beta" are to land in beta releases.

Stories are split per screen, and each feature may be extracted or collected from such.

> These stories are for MVP Alpha Release only. Each new stage should require new stories and this file should be updated accordingly.

## General

- I should see a page title on all pages
- I should see a navigation bar with (Home, Explore, Notifications, Profile, Discriminators, Settings) if I'm logged in
- I should see a navigation bar with (Explore, Discriminators, Settings) if I'm logged out
- I should see an ad container that can be disabled on the right side of the page
- I should see a search input on all pages on the ride
  - It should expand and highlight on input
  - It should suggest a few profiles as I type
  - Hitting enter should redirect me to `/search?q` with my search query
  - Clicking a suggested profile should direct me to it

## `/register`

- As an **anonymous** person I should/should be able to:

  - Access a registration page
  - See an accessible form with full name, email, and password required
  - Get accessible form validation in case my input is wrong
  - See requirements clearly such as password schema
  - See a register button that submits my data
  - Be informed that a confirmation email is sent to my email
  - Be redirected on successful submission to a login page
  - I should see a 'login instead' link to login with my existing account

- As a logged in member I should be redirected to `/home` on visit to `/register`

## `/verify?token=`

- As an anonymous person I should be able to access this page with a verification token
- If no token is passed redirect to `/login`
- If token is expired redirect to `/login`
- If token is invalid redirect to `/login`
- If token is valid log me in and redirect me to `/home`
- I should see a description of the state of the passed token before being redirected to other pages

## `/login`

- As an **anonymous** person I should/should be able to:

  - Access a login page
  - See an accessible form with email, and password required
  - Get accessible form validation in case my input is wrong
  - See requirements clearly such as "Password you used when registering"
  - See a login button that submits my data
  - Be informed that I haven't confirmed my account if my account is not verified (email link not clicked).
  - Be redirected on successful login to a `/home`
  - I should see a 'register instead' link to register an account

- As a logged in member I should be redirected to `/home` on visit to `/login`

## `/`

The `/home` page is where people see posts from members they follow.

- I should see a composer that allows me to post to my feed

- I should see a posts feed from people I follow
- If I don't follow anyone I should see a warning that I'm not following anyone with a link to `/explore`.
- Posts should be sorted chronologically
- I should see 10 posts a maximum at first load
- When scrolling down, older posts should be loaded in
- When scrolling down, posts I viewed and are now out of view borders should be removed from the DOM to conserve RAM
- When scrolling down if no more posts are available I should see a message that I reached the end of my feed and a link to `/explore`.

## `/explore`

- I should see two tabs, 'Top' and 'Latest' that control how posts are sorted
- I should see a posts feed from everyone on the network sorted by top by default
- Posts should be sorted chronologically
- I should see 10 posts a maximum at first load
- When scrolling down, older posts should be loaded in
- When scrolling down, posts I viewed and are now out of `view borders` should be removed from the DOM to conserve RAM
- When scrolling down if no more posts are available I should see a message that I reached the end of my feed and a "Perhaps you missed something from your notifications" to keep me engaged

## `/notifications`

- I should see notifications of all events that happened
- I should be able to click on a notification and be directed to its source
- Notifications are sorted chronologically
- Notifications that are unread should be highlighted with borders respective to colour
- Navigating to `/notifications` should mark all unseen notifications as `seen`

## `/:user_id` (Mine)

- I should be able to navigate to my profile either by nickname (if set) or id
- I should see a profile header with my details and an 'edit' button that opens the profile editor
- I should see my pinned posts and post feed
- I should see the number of posts I have next to the page title
- I should not be able to rate my own posts

## `/:user_id` (Others)

- I should be able to navigate to other people's profile either by nickname (if set) or id
- I should see a profile header with their details and a follow button that allows me to follow them
- I should see how many members follow this profile next to the follow button
- I should see their pinned posts and post feed
- I should see the number of posts they have next to the page title

## `/search`

- I should see the number of results next to page title
- I should see a text input below page title to change my query or create a new one
- If `?q=` is passed I should see results for the passed query

## `/settings`

- I should see tabs with each category
- When logged in, I should see categories Basics, Security, Notifications, Display, Ads, and Danger Zone
- When logged out, I should see categories Display and Ads
- I should see sections with title and description
- I should see a blurred out save button
- When changing a value the save button should light up and become clickable

## `/settings/basics`

- I should see a text input corresponding to each of these values: (name, location, tagline, nickname)
- I should see current values of the corresponding variables
- I should be able to change my full name
- I should be able to change my location
- I should be able to change my tagline
- I should be able to change my nickname
- I should be able to batch all changes in one save operation
- I should be asked for confirmation upon saving

## `/settings/security`

- I should be able to change my email
- I should be able to change my password
- I should be able to batch all changes in one save operation
- I should be asked for confirmation upon saving

## `/settings/notifications`

- I should see drop down options
- I should be able to change `approve` notifications
- I should be able to change `disapprove` notifications
- I should be able to change `comments` notifications
- I should be able to batch all changes in one save operation
- I should be asked for confirmation upon saving

## `/settings/display` (local)

- I should be able to change font size
- I should be able to change primary colour
- I should be able to change background colour
- I should be able to batch all changes in one save operation
- I should be asked for confirmation upon saving

## `/settings/ads` (local)

- I should see check box to disable or enable advertisement
- I should see a disclaimer
- I should be able to batch all changes in one save operation
- I should be asked for confirmation upon saving

## `/settings/danger`

- I should see an option to deactivate my account
- I should see an option to completely delete my account
- I should be able to batch all changes in one save operation
- I should be asked for confirmation upon saving

## `/discriminators`

- I should see a post feed of the top posts available (above 60% rate)
