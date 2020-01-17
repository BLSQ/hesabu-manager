# [1.7.0](https://github.com/BLSQ/hesabu-manager/compare/v1.6.0...v1.7.0) (2020-01-17)


### Bug Fixes

* Close bottom sheet when filters are open on simulation page ([d658d4f](https://github.com/BLSQ/hesabu-manager/commit/d658d4fcce2df5c241fc8238ce8a93999026562c))
* Fix the responsive drawer toggle ([1e7e191](https://github.com/BLSQ/hesabu-manager/commit/1e7e191a1b595fa313b0ad2c9945395a5c4586e5))
* List item link styles ([1dea8b7](https://github.com/BLSQ/hesabu-manager/commit/1dea8b7e0d82c8e8e94333b2a6a37024e6e76c1c))
* Make simulation cells more accessible ([f33f844](https://github.com/BLSQ/hesabu-manager/commit/f33f844a15f83cd20cf4715bbf6c8a46a25d0740))
* Only display cell tooltip when its not the topic name ([2546527](https://github.com/BLSQ/hesabu-manager/commit/2546527e1568e8b3975699af637ad3b9d54adc0d))
* Orgunit id now passed to simulation from set page ([a0cbda3](https://github.com/BLSQ/hesabu-manager/commit/a0cbda3f875c7ac8cb9c928230823b4c59c720c8))
* Set filtering should not take org unit into account ([ed2f5e9](https://github.com/BLSQ/hesabu-manager/commit/ed2f5e9eb4cac7a46c9acd74554c2dd455884506))
* Show container api fetch condition ([b76474b](https://github.com/BLSQ/hesabu-manager/commit/b76474b9a8b37d6e40dccb6e459c4ac1cf37ce88))
* Simulation modal now goes back to history previous location ([bf8c522](https://github.com/BLSQ/hesabu-manager/commit/bf8c5223bd2e0f131e9477978d3e225b4bfda58e))
* Simulation title ([ab560a8](https://github.com/BLSQ/hesabu-manager/commit/ab560a8bccc0df2071e4878012970770ad1fa036))


### Features

*  Long poll enqueued simulations ([#36](https://github.com/BLSQ/hesabu-manager/issues/36)) ([75b6044](https://github.com/BLSQ/hesabu-manager/commit/75b604498fb63ab3d1293846beb1d05893bd90f9))
* Add basic hometour for the demo ([86d3181](https://github.com/BLSQ/hesabu-manager/commit/86d31818a7a4262c8eceb4058b0bdda9d6f614b6))
* Add code editor for simulation cell explanation ([#35](https://github.com/BLSQ/hesabu-manager/issues/35)) ([1c90bbe](https://github.com/BLSQ/hesabu-manager/commit/1c90bbe3bd8d376b0a75898477b2569d6ad204b8))
* Add filters to sets index ([#53](https://github.com/BLSQ/hesabu-manager/issues/53)) ([2f4e455](https://github.com/BLSQ/hesabu-manager/commit/2f4e4556fc5b6eca063a0e68424421276c6bbe17))
* Add formulas card on compound show page ([a88b9a3](https://github.com/BLSQ/hesabu-manager/commit/a88b9a3307cba63c1d837c6bcbae8196eccb6598))
* Add help section and fix shortcuts ([846196c](https://github.com/BLSQ/hesabu-manager/commit/846196cea5e6bb59a81c45ef4e4d9d1d2c3b74a9))
* Add shortcut library ([#39](https://github.com/BLSQ/hesabu-manager/issues/39)) ([42a6164](https://github.com/BLSQ/hesabu-manager/commit/42a61645079c2c81e9cbdc74ac8de693b8ca3eb0))
* Add sidesheet to compound modal ([#50](https://github.com/BLSQ/hesabu-manager/issues/50)) ([689e7b5](https://github.com/BLSQ/hesabu-manager/commit/689e7b5190e1d6f41b44d504370f62f26c7905e8))
* Add simulation status icons ([ca686b3](https://github.com/BLSQ/hesabu-manager/commit/ca686b3b9466d281d28e19ff3e29d6918afc0112))
* Add topic list to sets list item ([61fe95f](https://github.com/BLSQ/hesabu-manager/commit/61fe95f1974ba7869c527928c576645f102a6c7d))
* Add warning when no sim blocks for current org unit ([#41](https://github.com/BLSQ/hesabu-manager/issues/41)) ([317e621](https://github.com/BLSQ/hesabu-manager/commit/317e621e345b319500aab0fcd056fc8c928f3ef0))
* Allow simulation blocks filtering via url param ([#37](https://github.com/BLSQ/hesabu-manager/issues/37)) ([ee8173c](https://github.com/BLSQ/hesabu-manager/commit/ee8173c89785d0fea185fddb94faf30dcc7fbd16))
* Expose a sets endpoints ([#42](https://github.com/BLSQ/hesabu-manager/issues/42)) ([8cb1150](https://github.com/BLSQ/hesabu-manager/commit/8cb1150de7426ed9a996df15d6ed1e27f2c0f337))
* Expose set groups payload at /set_groups ([#44](https://github.com/BLSQ/hesabu-manager/issues/44)) ([bd57ba8](https://github.com/BLSQ/hesabu-manager/commit/bd57ba80ff18f33aa75387828e828e70a04fac62))
* Fetch set from api and add fab sim btn ([#46](https://github.com/BLSQ/hesabu-manager/issues/46)) ([bfba750](https://github.com/BLSQ/hesabu-manager/commit/bfba7503839e00fa1317c7f048f8d633ed0ca999))
* Force auto reload for processed sims ([#40](https://github.com/BLSQ/hesabu-manager/issues/40)) ([b16b166](https://github.com/BLSQ/hesabu-manager/commit/b16b166344ff3785c89f7482466e03303a2064b2))
* Make the set formulas viewable in bottom sheet ([e78e943](https://github.com/BLSQ/hesabu-manager/commit/e78e94388940dd22a54488902c14cb0a11b89ba9))

# [1.6.0](https://github.com/BLSQ/hesabu-manager/compare/v1.5.0...v1.6.0) (2020-01-06)


### Bug Fixes

* Duration is returned in milliseconds ([#31](https://github.com/BLSQ/hesabu-manager/issues/31)) ([f63bab2](https://github.com/BLSQ/hesabu-manager/commit/f63bab2801ddc66c54129b9a4813fcdfb6025f2a))
* Simulation error now display properly ([18ca651](https://github.com/BLSQ/hesabu-manager/commit/18ca6518ebeec769080ab14e6789214a1d2ce75c))


### Features

* Display currently selected cell on simulation page ([#34](https://github.com/BLSQ/hesabu-manager/issues/34)) ([246bb4a](https://github.com/BLSQ/hesabu-manager/commit/246bb4abad0333ea98b727dc959529588866e746))

# [1.5.0](https://github.com/BLSQ/hesabu-manager/compare/v1.4.0...v1.5.0) (2019-12-19)


### Features

* Add new simulation button on sim index page ([00dd2b8](https://github.com/BLSQ/hesabu-manager/commit/00dd2b86d765f48eed00782ca740912fae5fcc90))

# [1.4.0](https://github.com/BLSQ/hesabu-manager/compare/v1.3.0...v1.4.0) (2019-12-18)


### Features

* Add /api/project for current project information ([#27](https://github.com/BLSQ/hesabu-manager/issues/27)) ([0da5dbc](https://github.com/BLSQ/hesabu-manager/commit/0da5dbc526dce027fd935899a4ddc7862b025408))
* Add `simulations` endpoint and direct link for simulations ([#24](https://github.com/BLSQ/hesabu-manager/issues/24)) ([a519c73](https://github.com/BLSQ/hesabu-manager/commit/a519c73089db4a14f35ecf80729e5d27aaec38d3))
* Add autocomplete endpoint to mock server ([#25](https://github.com/BLSQ/hesabu-manager/issues/25)) ([879b267](https://github.com/BLSQ/hesabu-manager/commit/879b267d1a26503e4838e6b8671a9cc60d93316d))
* Add basic cell explanation cell content ([#23](https://github.com/BLSQ/hesabu-manager/issues/23)) ([db80a11](https://github.com/BLSQ/hesabu-manager/commit/db80a11eb7463c461b495f8342380104dd1d3eef))
* Add simulation url based filters ([#26](https://github.com/BLSQ/hesabu-manager/issues/26)) ([12d4e32](https://github.com/BLSQ/hesabu-manager/commit/12d4e3214f7b2e874487b6765653226986f945a6))
* Make a better cell explanation panel ([#29](https://github.com/BLSQ/hesabu-manager/issues/29)) ([b088d8b](https://github.com/BLSQ/hesabu-manager/commit/b088d8ba74d608dacf1f7df6192f20fe453157a5))

# [1.3.0](https://github.com/BLSQ/hesabu-manager/compare/v1.2.0...v1.3.0) (2019-12-05)


### Bug Fixes

* Fix formula count on sets groups list item ([51027e1](https://github.com/BLSQ/hesabu-manager/commit/51027e115300eb089dffae79696c2c7b8c2683c3))
* Resources translations ([b4af648](https://github.com/BLSQ/hesabu-manager/commit/b4af6488508488d206e897fa9d4546cd3db9a8a5))
* Show modal routing ([#11](https://github.com/BLSQ/hesabu-manager/issues/11)) ([2f34cd4](https://github.com/BLSQ/hesabu-manager/commit/2f34cd49b5888ee459bb6c452354613afd3a7a8b))
* Simulations index title translation ([3ddc45b](https://github.com/BLSQ/hesabu-manager/commit/3ddc45b722db7d39439de705eb66171c0e7e4623))
* Typo in translation for buttons.back ([#14](https://github.com/BLSQ/hesabu-manager/issues/14)) ([6107b57](https://github.com/BLSQ/hesabu-manager/commit/6107b572ff63eb0d626316d1d4eaa123cfdc68d6))


### Features

* Add Bottom sheet ([#19](https://github.com/BLSQ/hesabu-manager/issues/19)) ([8f4ee09](https://github.com/BLSQ/hesabu-manager/commit/8f4ee09e8ab5a0ddb819cb959f242e46c66f6b2a))
* Add responsive simulation tables ([#20](https://github.com/BLSQ/hesabu-manager/issues/20)) ([f72cf94](https://github.com/BLSQ/hesabu-manager/commit/f72cf9428d54751f3f8d2828a01c3deabfca7390))
* Add selecting/filtering for simulation ([#15](https://github.com/BLSQ/hesabu-manager/issues/15)) ([41db4f6](https://github.com/BLSQ/hesabu-manager/commit/41db4f68f1f303f4745724d438dde044a20b1172))
* Add sets group modal ([#16](https://github.com/BLSQ/hesabu-manager/issues/16)) ([1a157c6](https://github.com/BLSQ/hesabu-manager/commit/1a157c684226b8ac8ca1f16221b6d5a1db3f4a1a))
* Add simulation tabs for each available period ([#18](https://github.com/BLSQ/hesabu-manager/issues/18)) ([1cbc19a](https://github.com/BLSQ/hesabu-manager/commit/1cbc19ae79809e66b68c458ddf8adb7435e7e53d))

# [1.2.0](https://github.com/BLSQ/hesabu-manager/compare/v1.1.0...v1.2.0) (2019-11-27)


### Features

* Add sets group items ([#9](https://github.com/BLSQ/hesabu-manager/issues/9)) ([e4912a7](https://github.com/BLSQ/hesabu-manager/commit/e4912a7b782da03a694b4a434c4d16bc7c5663f0))

# [1.1.0](https://github.com/BLSQ/hesabu-manager/compare/v1.0.0...v1.1.0) (2019-11-27)


### Features

* Add search clear btn ([#10](https://github.com/BLSQ/hesabu-manager/issues/10)) ([267eb43](https://github.com/BLSQ/hesabu-manager/commit/267eb43434d594ff4098951f79b26a3ff0107aac))

# 1.0.0 (2019-11-26)


### Bug Fixes

* set list styles ([ab0deee](https://github.com/BLSQ/hesabu-manager/commit/ab0deee97f9380ef41f87e76fc8abbece02193ed))


### Features

*  Add empty section component ([#5](https://github.com/BLSQ/hesabu-manager/issues/5)) ([4fdb970](https://github.com/BLSQ/hesabu-manager/commit/4fdb970ed1d707de226cf4472f32d83d3e5324c5))
* Add yarn format command ([#8](https://github.com/BLSQ/hesabu-manager/issues/8)) ([4ca0ef2](https://github.com/BLSQ/hesabu-manager/commit/4ca0ef235884d6ddc9fcd15cc778b4fd249a3ed9))
* First release ([d7f3838](https://github.com/BLSQ/hesabu-manager/commit/d7f383811400362e60131f1d0bc670fe9feb33a7))
