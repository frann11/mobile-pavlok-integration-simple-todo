"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'pavlok/5.0.0 (api/6.1.3)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Home:Index
     *
     */
    SDK.prototype.home_index_api_v5__get = function () {
        return this.core.fetch('/api/v5/', 'get');
    };
    /**
     * Bulk sync analytics data by executing the corresponding lambda functions on AWS.
     *         Possible analytics:
     *             - features-usage:
     *                 Mandatory parameters to provide for this analytic:
     *                     - start_date
     *                     - end_date
     *                     - usage_days (1 or 7)
     *                 Request example:
     *                 {
     *                     "analytics_bulk_sync": {
     *                         "analytic_name": "features-usage",
     *                         "start_date": "2023-07-29",
     *                         "end_date": "2023-07-31",
     *                         "usage_days": 7
     *                     }
     *                 }
     *
     *             - firmwares-adoption:
     *                 No parameters to provide
     *                 Request example:
     *                 {
     *                     "analytics_bulk_sync": {
     *                         "analytic_name": "firmwares-adoption",
     *                     }
     *                 }
     *
     *             - engagement-rate:
     *                 Mandatory parameters to provide for this analytic (Only one date, no
     * bulk sync):
     *                     - start_date
     *                 Request example:
     *                 {
     *                     "analytics_bulk_sync": {
     *                         "analytic_name": "firmwares-adoption",
     *                         "start_date": "2023-07-29",
     *                     }
     *                 }
     *
     * @summary Bulk sync analytics data
     * @throws FetchError<422, types.AnalyticsAdminBulkSyncApiV5AdminAnalyticsBulkSyncPostResponse422> Validation Error
     */
    SDK.prototype.analytics_admin_bulk_sync_api_v5_admin_analytics_bulk_sync_post = function (body) {
        return this.core.fetch('/api/v5/admin/analytics/bulk-sync', 'post', body);
    };
    /**
     * Get historical engagement rate data. An engaged user is a user who has used his device
     * at least once in the last week, and at least once 4 weeks ago.row
     *
     * @summary Get historical engagement rate data
     */
    SDK.prototype.analytics_admin_engagement_rate_api_v5_admin_analytics_engagement_rate_get = function () {
        return this.core.fetch('/api/v5/admin/analytics/engagement-rate', 'get');
    };
    /**
     * Get firmware usage rate by firmware version
     *
     * @summary Get firmware usage rate by firmware version
     */
    SDK.prototype.analytics_admin_firmware_adoption_api_v5_admin_analytics_firmware_adoption_get = function () {
        return this.core.fetch('/api/v5/admin/analytics/firmware-adoption', 'get');
    };
    /**
     * Get feature usage over weeks
     *
     * @summary Get feature usage over weeks
     * @throws FetchError<422, types.AnalyticsAdminFeaturesUsageApiV5AdminAnalyticsFeaturesUsageGetResponse422> Validation Error
     */
    SDK.prototype.analytics_admin_features_usage_api_v5_admin_analytics_features_usage_get = function (metadata) {
        return this.core.fetch('/api/v5/admin/analytics/features-usage', 'get', metadata);
    };
    /**
     * Get reviews with their topics for the given date range.
     *
     * @summary Get reviews with their topics
     * @throws FetchError<422, types.AnalyticsAdminReviewsApiV5AdminAnalyticsReviewsGetResponse422> Validation Error
     */
    SDK.prototype.analytics_admin_reviews_api_v5_admin_analytics_reviews_get = function (metadata) {
        return this.core.fetch('/api/v5/admin/analytics/reviews', 'get', metadata);
    };
    /**
     * Update the topics for a review given its id
     *
     * @summary Update the topics for a review
     * @throws FetchError<422, types.AnalyticsAdminReviewsUpdateApiV5AdminAnalyticsReviewsReviewIdPutResponse422> Validation Error
     */
    SDK.prototype.analytics_admin_reviews_update_api_v5_admin_analytics_reviews__review_id__put = function (body, metadata) {
        return this.core.fetch('/api/v5/admin/analytics/reviews/{review_id}', 'put', body, metadata);
    };
    /**
     * Get cumulative ratings along with averages across all platforms for a given date range
     *
     * @summary Get ratings across all platforms
     * @throws FetchError<422, types.AnalyticsAdminRatingsApiV5AdminAnalyticsRatingsGetResponse422> Validation Error
     */
    SDK.prototype.analytics_admin_ratings_api_v5_admin_analytics_ratings_get = function (metadata) {
        return this.core.fetch('/api/v5/admin/analytics/ratings', 'get', metadata);
    };
    /**
     * Route used to test the ai_chat_starter_service
     *
     * @throws FetchError<422, types.AiChatMessagesAdminCreateNonStreamApiV5AdminAiChatMessagesStartConvoPostResponse422> Validation Error
     */
    SDK.prototype.ai_chat_messages_admin_create_non_stream_api_v5_admin_ai_chat_messages_start_convo_post = function (body) {
        return this.core.fetch('/api/v5/admin/ai-chat/messages/start-convo', 'post', body);
    };
    /**
     * Create a new message in a specific thread.
     *
     * @summary Create a new chat message in a thread
     * @throws FetchError<422, types.AiChatMessagesAdminCreateApiV5AdminAiChatMessagesPostResponse422> Validation Error
     */
    SDK.prototype.ai_chat_messages_admin_create_api_v5_admin_ai_chat_messages_post = function (body, metadata) {
        return this.core.fetch('/api/v5/admin/ai-chat/messages', 'post', body, metadata);
    };
    /**
     * Get all badges
     *
     * @summary Get all badges
     */
    SDK.prototype.badges_admin_get_all_api_v5_admin_badges__get = function () {
        return this.core.fetch('/api/v5/admin/badges/', 'get');
    };
    /**
     * Create badge
     *
     * @summary Create badge
     * @throws FetchError<422, types.BadgesAdminCreateApiV5AdminBadgesPostResponse422> Validation Error
     */
    SDK.prototype.badges_admin_create_api_v5_admin_badges__post = function (body) {
        return this.core.fetch('/api/v5/admin/badges/', 'post', body);
    };
    /**
     * Get badge by id
     *
     * @summary Get badge by id
     * @throws FetchError<422, types.BadgesAdminGetByIdApiV5AdminBadgesGetOneBadgeIdGetResponse422> Validation Error
     */
    SDK.prototype.badges_admin_get_by_id_api_v5_admin_badges_get_one__badge_id__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/badges/get-one/{badge_id}', 'get', metadata);
    };
    /**
     * Update badge
     *
     * @summary Update badge
     * @throws FetchError<422, types.BadgesAdminUpdateApiV5AdminBadgesBadgeIdPutResponse422> Validation Error
     */
    SDK.prototype.badges_admin_update_api_v5_admin_badges__badge_id__put = function (body, metadata) {
        return this.core.fetch('/api/v5/admin/badges/{badge_id}', 'put', body, metadata);
    };
    /**
     * Delete badge
     *
     * @summary Delete badge
     * @throws FetchError<422, types.BadgesAdminDeleteApiV5AdminBadgesBadgeIdDeleteResponse422> Validation Error
     */
    SDK.prototype.badges_admin_delete_api_v5_admin_badges__badge_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/admin/badges/{badge_id}', 'delete', metadata);
    };
    /**
     * Add badge to user
     *
     * @summary Add badge to user
     * @throws FetchError<422, types.BadgesAdminAddUserBadgeApiV5AdminBadgesAddUserBadgePostResponse422> Validation Error
     */
    SDK.prototype.badges_admin_add_user_badge_api_v5_admin_badges_add_user_badge_post = function (body) {
        return this.core.fetch('/api/v5/admin/badges/add-user-badge', 'post', body);
    };
    /**
     * Get user badges
     *
     * @summary Get user badges
     * @throws FetchError<422, types.BadgesAdminGetUserBadgesApiV5AdminBadgesGetUserBadgesGetResponse422> Validation Error
     */
    SDK.prototype.badges_admin_get_user_badges_api_v5_admin_badges_get_user_badges_get = function (metadata) {
        return this.core.fetch('/api/v5/admin/badges/get-user-badges', 'get', metadata);
    };
    /**
     * Get all banners for admin dashboard
     *
     * @summary Get all banners
     */
    SDK.prototype.banners_admin_get_all_api_v5_admin_banners_all_get = function () {
        return this.core.fetch('/api/v5/admin/banners/all', 'get');
    };
    /**
     * Get one banner details for admin dashboard
     *
     * @summary Get one banner details
     * @throws FetchError<422, types.BannersAdminGetOneApiV5AdminBannersBannerIdGetResponse422> Validation Error
     */
    SDK.prototype.banners_admin_get_one_api_v5_admin_banners__banner_id__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/banners/{banner_id}', 'get', metadata);
    };
    /**
     * Update banner for admin dashboard
     *
     * @summary Update banner
     * @throws FetchError<422, types.BannersAdminUpdateApiV5AdminBannersPutResponse422> Validation Error
     */
    SDK.prototype.banners_admin_update_api_v5_admin_banners__put = function (body) {
        return this.core.fetch('/api/v5/admin/banners/', 'put', body);
    };
    /**
     * Create banner for admin dashboard
     *
     * @summary Create banner
     * @throws FetchError<422, types.BannersAdminCreateApiV5AdminBannersPostResponse422> Validation Error
     */
    SDK.prototype.banners_admin_create_api_v5_admin_banners__post = function (body) {
        return this.core.fetch('/api/v5/admin/banners/', 'post', body);
    };
    /**
     * Delete banner for admin dashboard
     *
     * @summary Delete banner
     * @throws FetchError<422, types.BannersAdminDeleteApiV5AdminBannersDeleteResponse422> Validation Error
     */
    SDK.prototype.banners_admin_delete_api_v5_admin_banners__delete = function (metadata) {
        return this.core.fetch('/api/v5/admin/banners/', 'delete', metadata);
    };
    /**
     * Get all challenges for admin dashboard
     *
     * @summary Get all challenges
     */
    SDK.prototype.challenges_admin_get_all_api_v5_admin_challenges__get = function () {
        return this.core.fetch('/api/v5/admin/challenges/', 'get');
    };
    /**
     * Update challenge for admin dashboard
     *
     * @summary Update challenge
     * @throws FetchError<422, types.ChallengesAdminUpdateApiV5AdminChallengesPutResponse422> Validation Error
     */
    SDK.prototype.challenges_admin_update_api_v5_admin_challenges__put = function (body) {
        return this.core.fetch('/api/v5/admin/challenges/', 'put', body);
    };
    /**
     * Creates a challenge.
     *         Parameters:
     *             - name: Challenge name.
     *             - type: Only "HABITS" type is possible for now.
     *             - description: Challenge description
     *             - startDate: Challenge start date
     *             - endDate: Challenge end date
     *             - ownerId: The id of the user to set as an owner of this challenge
     *             - entitlements: RevenueCat entitlements needed to join this challenge. Null
     * means no needed entitlements.
     *             - chatGroupLink: Challenge chat group link (WhatsApp or telegram link)
     *             - maxPoints: Defines the max number of points a user can get in one day,
     * which means the max number of
     *                 habits he can link to this challenge.
     *             - personalHabitChallenge: Used for personal coaching. Set to false for now.
     *             - finalGoal: Used for other types of challenges (steps ..). Set to null for
     * now.
     *             - globalChallenge: Whether the challenge is visible for everyone or not. Set
     * to True for now.
     *             - teamsNames: List of names of the teams to create
     *
     * @summary Create challenge
     * @throws FetchError<422, types.ChallengesAdminCreateApiV5AdminChallengesPostResponse422> Validation Error
     */
    SDK.prototype.challenges_admin_create_api_v5_admin_challenges__post = function (body) {
        return this.core.fetch('/api/v5/admin/challenges/', 'post', body);
    };
    /**
     * Delete challenge for admin dashboard
     *
     * @summary Delete challenge
     * @throws FetchError<422, types.ChallengesAdminDeleteApiV5AdminChallengesDeleteResponse422> Validation Error
     */
    SDK.prototype.challenges_admin_delete_api_v5_admin_challenges__delete = function (metadata) {
        return this.core.fetch('/api/v5/admin/challenges/', 'delete', metadata);
    };
    /**
     * Get a challenge for admin dashboard
     *
     * @summary Get a challenge
     * @throws FetchError<422, types.ChallengesAdminGetOneApiV5AdminChallengesChallengeIdGetResponse422> Validation Error
     */
    SDK.prototype.challenges_admin_get_one_api_v5_admin_challenges__challenge_id__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/challenges/{challenge_id}', 'get', metadata);
    };
    /**
     * Get all contents
     *
     */
    SDK.prototype.contents_admin_get_all_api_v5_admin_contents__get = function () {
        return this.core.fetch('/api/v5/admin/contents/', 'get');
    };
    /**
     * Create content
     *
     * @throws FetchError<422, types.ContentsAdminCreateApiV5AdminContentsPostResponse422> Validation Error
     */
    SDK.prototype.contents_admin_create_api_v5_admin_contents__post = function (body) {
        return this.core.fetch('/api/v5/admin/contents/', 'post', body);
    };
    /**
     * Get one content
     *
     * @throws FetchError<422, types.ContentsAdminGetByIdApiV5AdminContentsContentIdGetResponse422> Validation Error
     */
    SDK.prototype.contents_admin_get_by_id_api_v5_admin_contents__content_id__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/contents/{content_id}', 'get', metadata);
    };
    /**
     * Update content
     *
     * @throws FetchError<422, types.ContentsAdminUpdateApiV5AdminContentsContentIdPutResponse422> Validation Error
     */
    SDK.prototype.contents_admin_update_api_v5_admin_contents__content_id__put = function (body, metadata) {
        return this.core.fetch('/api/v5/admin/contents/{content_id}', 'put', body, metadata);
    };
    /**
     * Delete content
     *
     * @throws FetchError<422, types.ContentsAdminDeleteApiV5AdminContentsContentIdDeleteResponse422> Validation Error
     */
    SDK.prototype.contents_admin_delete_api_v5_admin_contents__content_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/admin/contents/{content_id}', 'delete', metadata);
    };
    /**
     * Create multiple contents from CSV
     *
     * @throws FetchError<422, types.ContentsAdminBulkCreateApiV5AdminContentsBulkPostResponse422> Validation Error
     */
    SDK.prototype.contents_admin_bulk_create_api_v5_admin_contents_bulk_post = function (body) {
        return this.core.fetch('/api/v5/admin/contents/bulk', 'post', body);
    };
    /**
     * Get all content categories
     *
     */
    SDK.prototype.contents_categories_admin_get_all_api_v5_admin_content_categories__get = function () {
        return this.core.fetch('/api/v5/admin/content-categories/', 'get');
    };
    /**
     * Create content category
     *
     * @throws FetchError<422, types.ContentsCategoriesAdminCreateApiV5AdminContentCategoriesPostResponse422> Validation Error
     */
    SDK.prototype.contents_categories_admin_create_api_v5_admin_content_categories__post = function (body) {
        return this.core.fetch('/api/v5/admin/content-categories/', 'post', body);
    };
    /**
     * Get one content category
     *
     * @throws FetchError<422, types.ContentsCategoriesAdminGetOneApiV5AdminContentCategoriesContentsCategoryIdGetResponse422> Validation Error
     */
    SDK.prototype.contents_categories_admin_get_one_api_v5_admin_content_categories__contents_category_id__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/content-categories/{contents_category_id}', 'get', metadata);
    };
    /**
     * Update content category
     *
     * @throws FetchError<422, types.ContentsCategoriesAdminUpdateApiV5AdminContentCategoriesContentsCategoryIdPutResponse422> Validation Error
     */
    SDK.prototype.contents_categories_admin_update_api_v5_admin_content_categories__contents_category_id__put = function (body, metadata) {
        return this.core.fetch('/api/v5/admin/content-categories/{contents_category_id}', 'put', body, metadata);
    };
    /**
     * Delete content category
     *
     * @throws FetchError<422, types.ContentsCategoriesAdminDeleteApiV5AdminContentCategoriesContentsCategoryIdDeleteResponse422> Validation Error
     */
    SDK.prototype.contents_categories_admin_delete_api_v5_admin_content_categories__contents_category_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/admin/content-categories/{contents_category_id}', 'delete', metadata);
    };
    /**
     * Get all challenges of the coach
     *
     * @summary Get all challenges of the coach
     * @throws FetchError<422, types.CoachingAdminGetChallengesByCoachApiV5AdminCoachingChallengesGetResponse422> Validation Error
     */
    SDK.prototype.coaching_admin_get_challenges_by_coach_api_v5_admin_coaching_challenges_get = function (metadata) {
        return this.core.fetch('/api/v5/admin/coaching/challenges', 'get', metadata);
    };
    /**
     * Get all coaches for the specified challenge
     *
     * @summary Get all coaches for the specified challenge
     * @throws FetchError<422, types.CoachingAdminGetCoachesByChallengeApiV5AdminCoachingChallengeIdGetResponse422> Validation Error
     */
    SDK.prototype.coaching_admin_get_coaches_by_challenge_api_v5_admin_coaching__challenge_id__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/coaching/{challenge_id}', 'get', metadata);
    };
    /**
     * Add a list of coaches to the specified challenge
     *
     * @summary Add a list of coaches to the specified challenge
     * @throws FetchError<422, types.CoachingAdminAddCoachesToChallengeApiV5AdminCoachingChallengeIdPostResponse422> Validation Error
     */
    SDK.prototype.coaching_admin_add_coaches_to_challenge_api_v5_admin_coaching__challenge_id__post = function (body, metadata) {
        return this.core.fetch('/api/v5/admin/coaching/{challenge_id}', 'post', body, metadata);
    };
    /**
     * Delete a coach from the specified challenge
     *
     * @summary Delete a coach from the specified challenge
     * @throws FetchError<422, types.CoachingAdminDeleteCoachFromChallengeApiV5AdminCoachingChallengeIdDeleteResponse422> Validation Error
     */
    SDK.prototype.coaching_admin_delete_coach_from_challenge_api_v5_admin_coaching__challenge_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/admin/coaching/{challenge_id}', 'delete', metadata);
    };
    /**
     * Get all firmwares
     *
     * @summary Get all firmwares
     */
    SDK.prototype.firmwares_admin_get_all_api_v5_admin_firmwares__get = function () {
        return this.core.fetch('/api/v5/admin/firmwares/', 'get');
    };
    /**
     * Create firmware for admin dashboard
     *
     * @summary Create firmware
     * @throws FetchError<422, types.FirmwaresAdminCreateApiV5AdminFirmwaresPostResponse422> Validation Error
     */
    SDK.prototype.firmwares_admin_create_api_v5_admin_firmwares__post = function (body) {
        return this.core.fetch('/api/v5/admin/firmwares/', 'post', body);
    };
    /**
     * Delete firmware for admin dashboard
     *
     * @summary Delete firmware
     * @throws FetchError<422, types.FirmwaresAdminDeleteApiV5AdminFirmwaresDeleteResponse422> Validation Error
     */
    SDK.prototype.firmwares_admin_delete_api_v5_admin_firmwares__delete = function (metadata) {
        return this.core.fetch('/api/v5/admin/firmwares/', 'delete', metadata);
    };
    /**
     * Get one firmware details for admin dashboard
     *
     * @summary Get one firmware details
     * @throws FetchError<422, types.FirmwaresAdminGetOneApiV5AdminFirmwaresFirmwareIdGetResponse422> Validation Error
     */
    SDK.prototype.firmwares_admin_get_one_api_v5_admin_firmwares__firmware_id__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/firmwares/{firmware_id}', 'get', metadata);
    };
    /**
     * Update firmware for admin dashboard
     *
     * @summary Update firmware
     * @throws FetchError<422, types.FirmwaresAdminUpdateApiV5AdminFirmwaresFirmwareIdPutResponse422> Validation Error
     */
    SDK.prototype.firmwares_admin_update_api_v5_admin_firmwares__firmware_id__put = function (body, metadata) {
        return this.core.fetch('/api/v5/admin/firmwares/{firmware_id}', 'put', body, metadata);
    };
    /**
     * Get all hardwares for admin dashboard
     *
     * @summary Get all hardwares
     */
    SDK.prototype.hardwares_admin_get_all_api_v5_admin_hardwares__get = function () {
        return this.core.fetch('/api/v5/admin/hardwares/', 'get');
    };
    /**
     * Get current user friends
     *
     * @summary Get friends
     * @throws FetchError<422, types.FriendshipsAdminGetFriendsApiV5AdminFriendshipsGetFriendsGetResponse422> Validation Error
     */
    SDK.prototype.friendships_admin_get_friends_api_v5_admin_friendships_get_friends_get = function (metadata) {
        return this.core.fetch('/api/v5/admin/friendships/get-friends', 'get', metadata);
    };
    /**
     * Get all habits
     *
     * @summary Get all habits
     */
    SDK.prototype.habits_admin_get_all_api_v5_admin_habits__get = function () {
        return this.core.fetch('/api/v5/admin/habits/', 'get');
    };
    /**
     * Update Habit
     *
     * @summary Update Habit
     * @throws FetchError<422, types.HabitsAdminUpdateApiV5AdminHabitsPutResponse422> Validation Error
     */
    SDK.prototype.habits_admin_update_api_v5_admin_habits__put = function (body) {
        return this.core.fetch('/api/v5/admin/habits/', 'put', body);
    };
    /**
     * Create Habit with questions and answers
     *
     * @summary Create Habit with questions and answers
     * @throws FetchError<422, types.HabitsAdminCreateApiV5AdminHabitsPostResponse422> Validation Error
     */
    SDK.prototype.habits_admin_create_api_v5_admin_habits__post = function (body) {
        return this.core.fetch('/api/v5/admin/habits/', 'post', body);
    };
    /**
     * Delete Habit
     *
     * @summary Delete Habit
     * @throws FetchError<422, types.HabitsAdminDeleteApiV5AdminHabitsDeleteResponse422> Validation Error
     */
    SDK.prototype.habits_admin_delete_api_v5_admin_habits__delete = function (metadata) {
        return this.core.fetch('/api/v5/admin/habits/', 'delete', metadata);
    };
    /**
     * Get one habit
     *
     * @summary Get one habit
     * @throws FetchError<422, types.HabitsAdminGetOneApiV5AdminHabitsHabitIdGetResponse422> Validation Error
     */
    SDK.prototype.habits_admin_get_one_api_v5_admin_habits__habit_id__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/habits/{habit_id}', 'get', metadata);
    };
    /**
     * Update habit question.
     *
     * @summary Update habit question
     * @throws FetchError<422, types.HabitQuestionsAdminUpdateApiV5AdminHabitQuestionsPutResponse422> Validation Error
     */
    SDK.prototype.habit_questions_admin_update_api_v5_admin_habit_questions__put = function (body) {
        return this.core.fetch('/api/v5/admin/habit-questions/', 'put', body);
    };
    /**
     * Create habit question.
     *
     * @summary Create habit question
     * @throws FetchError<422, types.HabitQuestionsAdminCreateApiV5AdminHabitQuestionsPostResponse422> Validation Error
     */
    SDK.prototype.habit_questions_admin_create_api_v5_admin_habit_questions__post = function (body) {
        return this.core.fetch('/api/v5/admin/habit-questions/', 'post', body);
    };
    /**
     * Delete habit question
     *
     * @summary Delete habit question
     * @throws FetchError<422, types.HabitQuestionsAdminDeleteApiV5AdminHabitQuestionsDeleteResponse422> Validation Error
     */
    SDK.prototype.habit_questions_admin_delete_api_v5_admin_habit_questions__delete = function (metadata) {
        return this.core.fetch('/api/v5/admin/habit-questions/', 'delete', metadata);
    };
    /**
     * Update habit possible answer
     *
     * @summary Update habit possible answer
     * @throws FetchError<422, types.HabitPossibleAnswersAdminUpdateApiV5AdminHabitPossibleAnswersPutResponse422> Validation Error
     */
    SDK.prototype.habit_possible_answers_admin_update_api_v5_admin_habit_possible_answers__put = function (body) {
        return this.core.fetch('/api/v5/admin/habit-possible-answers/', 'put', body);
    };
    /**
     * Create habit possible answer
     *
     * @summary Create habit possible answer
     * @throws FetchError<422, types.HabitPossibleAnswersAdminCreateApiV5AdminHabitPossibleAnswersPostResponse422> Validation Error
     */
    SDK.prototype.habit_possible_answers_admin_create_api_v5_admin_habit_possible_answers__post = function (body) {
        return this.core.fetch('/api/v5/admin/habit-possible-answers/', 'post', body);
    };
    /**
     * Delete habit possible answer
     *
     * @summary Delete habit possible answer
     * @throws FetchError<422, types.HabitPossibleAnswersAdminDeleteApiV5AdminHabitPossibleAnswersDeleteResponse422> Validation Error
     */
    SDK.prototype.habit_possible_answers_admin_delete_api_v5_admin_habit_possible_answers__delete = function (metadata) {
        return this.core.fetch('/api/v5/admin/habit-possible-answers/', 'delete', metadata);
    };
    /**
     * Get granted poke permissions by user id
     *
     * @summary Get granted poke permissions
     * @throws FetchError<422, types.PokePermissionsAdminGetUserPokePermissionsApiV5AdminPokePermissionsGrantedGetResponse422> Validation Error
     */
    SDK.prototype.poke_permissions_admin_get_user_poke_permissions_api_v5_admin_poke_permissions_granted_get = function (metadata) {
        return this.core.fetch('/api/v5/admin/poke-permissions/granted', 'get', metadata);
    };
    /**
     * Get received poke permissions by user id
     *
     * @summary Get received poke permissions
     * @throws FetchError<422, types.PokePermissionsAdminGetReceivedPokePermissionsApiV5AdminPokePermissionsReceivedGetResponse422> Validation Error
     */
    SDK.prototype.poke_permissions_admin_get_received_poke_permissions_api_v5_admin_poke_permissions_received_get = function (metadata) {
        return this.core.fetch('/api/v5/admin/poke-permissions/received', 'get', metadata);
    };
    /**
     * Delete a poke permission
     *
     * @summary Delete a poke permission
     * @throws FetchError<422, types.PokePermissionsAdminDeletePokePermissionApiV5AdminPokePermissionsPokePermissionIdDeleteResponse422> Validation Error
     */
    SDK.prototype.poke_permissions_admin_delete_poke_permission_api_v5_admin_poke_permissions__poke_permission_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/admin/poke-permissions/{poke_permission_id}', 'delete', metadata);
    };
    /**
     * Get staff users
     *
     */
    SDK.prototype.users_admin_get_staff_api_v5_admin_users_staff_get = function () {
        return this.core.fetch('/api/v5/admin/users/staff', 'get');
    };
    /**
     * Get one user
     *
     * @throws FetchError<422, types.UsersAdminGetOneApiV5AdminUsersUserIdGetResponse422> Validation Error
     */
    SDK.prototype.users_admin_get_one_api_v5_admin_users__user_id__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/users/{user_id}', 'get', metadata);
    };
    /**
     * Update user
     *
     * @throws FetchError<422, types.UsersAdminUpdateUserApiV5AdminUsersUserIdPutResponse422> Validation Error
     */
    SDK.prototype.users_admin_update_user_api_v5_admin_users__user_id__put = function (body, metadata) {
        return this.core.fetch('/api/v5/admin/users/{user_id}', 'put', body, metadata);
    };
    /**
     * Get all users for admin dashboard
     *
     * @summary Get all users
     * @throws FetchError<422, types.UsersAdminGetAllApiV5AdminUsersGetResponse422> Validation Error
     */
    SDK.prototype.users_admin_get_all_api_v5_admin_users__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/users/', 'get', metadata);
    };
    /**
     * Any: no one can update his role, no one can add a new root;
     * Root: can update any account.
     * SuperAdmin: can assign SuperAdmin, Admin, Coach, support
     * Admin: can assign Coach, support
     *
     * @summary Update user role
     * @throws FetchError<422, types.UsersAdminUpdateUserRoleApiV5AdminUsersUpdateUserRolePutResponse422> Validation Error
     */
    SDK.prototype.users_admin_update_user_role_api_v5_admin_users_update_user_role_put = function (body) {
        return this.core.fetch('/api/v5/admin/users/update-user-role', 'put', body);
    };
    /**
     * Update user password
     *
     * @throws FetchError<422, types.UsersAdminUpdateUserPasswordApiV5AdminUsersUserIdChangePasswordPutResponse422> Validation Error
     */
    SDK.prototype.users_admin_update_user_password_api_v5_admin_users__user_id__change_password_put = function (body, metadata) {
        return this.core.fetch('/api/v5/admin/users/{user_id}/change-password', 'put', body, metadata);
    };
    /**
     * Sends a "Forget Password" email to the email address in of the specified user
     *
     * @summary Send reset email
     * @throws FetchError<422, types.UsersAdminSendResetEmailApiV5AdminUsersUserIdResetPasswordEmailPostResponse422> Validation Error
     */
    SDK.prototype.users_admin_send_reset_email_api_v5_admin_users__user_id__reset_password_email_post = function (metadata) {
        return this.core.fetch('/api/v5/admin/users/{user_id}/reset-password-email', 'post', metadata);
    };
    /**
     * Resend confirmation email to specific user
     *
     * @summary Resend confirmation email
     * @throws FetchError<422, types.UsersAdminResendConfirmEmailApiV5AdminUsersUserIdResendConfirmEmailPostResponse422> Validation Error
     */
    SDK.prototype.users_admin_resend_confirm_email_api_v5_admin_users__user_id__resend_confirm_email_post = function (metadata) {
        return this.core.fetch('/api/v5/admin/users/{user_id}/resend-confirm-email', 'post', metadata);
    };
    /**
     * Get user's devices
     *
     * @summary Get user's devices
     * @throws FetchError<422, types.DevicesAdminGetByUserIdApiV5AdminDevicesGetResponse422> Validation Error
     */
    SDK.prototype.devices_admin_get_by_user_id_api_v5_admin_devices__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/devices/', 'get', metadata);
    };
    /**
     * Get all users' devices for admin dashboard
     *
     * @summary Get all users' devices
     * @throws FetchError<422, types.DevicesAdminGetAllApiV5AdminDevicesAllGetResponse422> Validation Error
     */
    SDK.prototype.devices_admin_get_all_api_v5_admin_devices_all_get = function (metadata) {
        return this.core.fetch('/api/v5/admin/devices/all', 'get', metadata);
    };
    /**
     * Get one user device for admin dashboard
     *
     * @summary Get one user device
     * @throws FetchError<422, types.DevicesAdminGetOneApiV5AdminDevicesDeviceIdGetResponse422> Validation Error
     */
    SDK.prototype.devices_admin_get_one_api_v5_admin_devices__device_id__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/devices/{device_id}', 'get', metadata);
    };
    /**
     * Get sleep datasets by user id
     *
     * @summary Get sleep datasets
     * @throws FetchError<422, types.SleepDatasetsAdminGetListApiV5AdminSleepDatasetsGetResponse422> Validation Error
     */
    SDK.prototype.sleep_datasets_admin_get_list_api_v5_admin_sleep_datasets__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/sleep-datasets/', 'get', metadata);
    };
    /**
     * Get user's phone devices
     *
     * @summary Get user's phone devices
     * @throws FetchError<422, types.PhoneDevicesAdminGetListApiV5AdminPhoneDevicesGetResponse422> Validation Error
     */
    SDK.prototype.phone_devices_admin_get_list_api_v5_admin_phone_devices__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/phone-devices/', 'get', metadata);
    };
    /**
     * Get user's volts transactions
     *
     * @summary Get user's volts transactions
     * @throws FetchError<422, types.VoltsTransactionsAdminGetListApiV5AdminVoltsTransactionsGetResponse422> Validation Error
     */
    SDK.prototype.volts_transactions_admin_get_list_api_v5_admin_volts_transactions__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/volts-transactions/', 'get', metadata);
    };
    /**
     * Get user habits
     *
     * @throws FetchError<422, types.UsersAdminGetUserHabitsApiV5AdminUserHabitsGetResponse422> Validation Error
     */
    SDK.prototype.users_admin_get_user_habits_api_v5_admin_user_habits__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/user-habits/', 'get', metadata);
    };
    /**
     * Get all entitlement on revenue cat
     *
     * @summary Get all entitlement
     */
    SDK.prototype.revenue_cat_admin_get_revenue_cat_entitlements_api_v5_admin_entitlements__get = function () {
        return this.core.fetch('/api/v5/admin/entitlements/', 'get');
    };
    /**
     * Get list of user entitlements
     *
     * @throws FetchError<422, types.UsersAdminGetUserEntitlementsApiV5AdminEntitlementsUserIdGetResponse422> Validation Error
     */
    SDK.prototype.users_admin_get_user_entitlements_api_v5_admin_entitlements__user_id__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/entitlements/{user_id}', 'get', metadata);
    };
    /**
     * Get all volts actions
     *
     * @summary Get all volts actions
     */
    SDK.prototype.volts_actions_admin_get_all_api_v5_admin_volts_actions__get = function () {
        return this.core.fetch('/api/v5/admin/volts-actions/', 'get');
    };
    /**
     * Update volts action
     *
     * @summary Update volts action
     * @throws FetchError<422, types.VoltsActionsAdminUpdateApiV5AdminVoltsActionsPutResponse422> Validation Error
     */
    SDK.prototype.volts_actions_admin_update_api_v5_admin_volts_actions__put = function (body) {
        return this.core.fetch('/api/v5/admin/volts-actions/', 'put', body);
    };
    /**
     * Create volts action
     *
     * @summary Create volts action
     * @throws FetchError<422, types.VoltsActionsAdminCreateApiV5AdminVoltsActionsPostResponse422> Validation Error
     */
    SDK.prototype.volts_actions_admin_create_api_v5_admin_volts_actions__post = function (body) {
        return this.core.fetch('/api/v5/admin/volts-actions/', 'post', body);
    };
    /**
     * Get volts action by key
     *
     * @summary Get volts action by key
     * @throws FetchError<422, types.VoltsActionsAdminGetByKeyApiV5AdminVoltsActionsGetByKeyVoltsActionKeyGetResponse422> Validation Error
     */
    SDK.prototype.volts_actions_admin_get_by_key_api_v5_admin_volts_actions_get_by_key__volts_action_key__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/volts-actions/get-by-key/{volts_action_key}', 'get', metadata);
    };
    /**
     * Get volts action by id
     *
     * @summary Get volts action by id
     * @throws FetchError<422, types.VoltsActionsAdminGetByIdApiV5AdminVoltsActionsGetByIdVoltsActionIdGetResponse422> Validation Error
     */
    SDK.prototype.volts_actions_admin_get_by_id_api_v5_admin_volts_actions_get_by_id__volts_action_id__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/volts-actions/get-by-id/{volts_action_id}', 'get', metadata);
    };
    /**
     * Delete volts action
     *
     * @summary Delete volts action
     * @throws FetchError<422, types.VoltsActionsAdminDeleteApiV5AdminVoltsActionsVoltsActionIdDeleteResponse422> Validation Error
     */
    SDK.prototype.volts_actions_admin_delete_api_v5_admin_volts_actions__volts_action_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/admin/volts-actions/{volts_action_id}', 'delete', metadata);
    };
    /**
     * Admin only: Add volts to current user's wallet
     *
     * @summary Admin only: Add volts to current user's wallet
     * @throws FetchError<422, types.WalletsAdminAddVoltsApiV5AdminWalletsAddVoltsPutResponse422> Validation Error
     */
    SDK.prototype.wallets_admin_add_volts_api_v5_admin_wallets_add_volts_put = function (body) {
        return this.core.fetch('/api/v5/admin/wallets/add-volts', 'put', body);
    };
    /**
     * Get all stimulus in a pagination response
     *
     * @summary Get stimulus
     * @throws FetchError<422, types.StimulusAdminGetAllByFiltersPaginatedApiV5AdminStimulusAllGetResponse422> Validation Error
     */
    SDK.prototype.stimulus_admin_get_all_by_filters_paginated_api_v5_admin_stimulus_all__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/stimulus/all/', 'get', metadata);
    };
    /**
     * Get list of campaigns
     *
     * @summary Get list of campaigns
     */
    SDK.prototype.campaigns_admin_get_all_api_v5_admin_campaigns__get = function () {
        return this.core.fetch('/api/v5/admin/campaigns/', 'get');
    };
    /**
     * Create campaign and send notifications to all subscribers of the specified topic
     *
     * @summary Create campaign
     * @throws FetchError<422, types.CampaignsAdminCreateApiV5AdminCampaignsPostResponse422> Validation Error
     */
    SDK.prototype.campaigns_admin_create_api_v5_admin_campaigns__post = function (body) {
        return this.core.fetch('/api/v5/admin/campaigns/', 'post', body);
    };
    /**
     * Get campaign with stats by id
     *
     * @summary Get campaign with stats by id
     * @throws FetchError<422, types.CampaignsAdminGetOneApiV5AdminCampaignsCampaignIdGetResponse422> Validation Error
     */
    SDK.prototype.campaigns_admin_get_one_api_v5_admin_campaigns__campaign_id__get = function (metadata) {
        return this.core.fetch('/api/v5/admin/campaigns/{campaign_id}', 'get', metadata);
    };
    /**
     * Get list of valid fcm topics and their users count
     *
     * @summary Get fcm topics
     */
    SDK.prototype.fcm_topics_admin_get_fcm_topics_api_v5_admin_fcm_topics__get = function () {
        return this.core.fetch('/api/v5/admin/fcm-topics/', 'get');
    };
    /**
     * Run GA report.
     *     Request body example:
     *         {
     *             "dimensions": ["appVersion", "date"],
     *             "metrics": ["activeUsers", "newUsers"],
     *             "start_date": "2023-06-26",
     *             "end_date": "2023-07-26"
     *         }
     *
     *     - Possible values for dimensions:
     *
     * https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#dimensions
     *     - Possible values for metrics:
     *
     * https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#metrics
     *     - date_range must be a list of two dates: the first is the start date and the 2nd is
     * the end date
     *     The response will be a list of dicts. The keys of the dicts are the provided
     * dimensions and metrics.
     *     Response example
     *     [
     *         {
     *             "appVersion": "2.0.0",
     *             "date": "20230725",
     *             "activeUsers": "11956",
     *             "newUsers": "271"
     *         },
     *         {
     *             "appVersion": "2.0.0",
     *             "date": "20230724",
     *             "activeUsers": "11849",
     *             "newUsers": "343"
     *         }
     *     ]
     *
     * @summary Run GA report
     * @throws FetchError<422, types.GoogleAnalyticsRunReportApiV5AdminGoogleAnalyticsPostResponse422> Validation Error
     */
    SDK.prototype.google_analytics_run_report_api_v5_admin_google_analytics__post = function (body) {
        return this.core.fetch('/api/v5/admin/google-analytics/', 'post', body);
    };
    /**
     * Launches the specified celery task with the specified parameters
     *
     * @summary Launches the specified celery task
     * @throws FetchError<422, types.CeleryTasksAdminAdminReviewsSyncApiV5AdminCeleryTasksPostResponse422> Validation Error
     */
    SDK.prototype.celery_tasks_admin_admin_reviews_sync_api_v5_admin_celery_tasks__post = function (body) {
        return this.core.fetch('/api/v5/admin/celery-tasks/', 'post', body);
    };
    /**
     * Initialize Intercom app
     *
     */
    SDK.prototype.intercom_initialize_api_v5_intercom_initialize_post = function () {
        return this.core.fetch('/api/v5/intercom/initialize', 'post');
    };
    /**
     * Refresh Intercom app date
     *
     */
    SDK.prototype.intercom_submit_api_v5_intercom_submit_post = function () {
        return this.core.fetch('/api/v5/intercom/submit', 'post');
    };
    /**
     * Oauth logout
     *
     */
    SDK.prototype.route_logout_and_remove_cookie_api_v5_oauth_logout_get = function () {
        return this.core.fetch('/api/v5/oauth/logout', 'get');
    };
    /**
     * Return the login form page
     *
     * @summary Oauth login page
     * @throws FetchError<422, types.OauthAuthenticationLoginApiV5OauthLoginGetResponse422> Validation Error
     */
    SDK.prototype.oauth_authentication_login_api_v5_oauth_login_get = function (metadata) {
        return this.core.fetch('/api/v5/oauth/login', 'get', metadata);
    };
    /**
     * Handle the login.
     *
     * @summary Oauth login
     * @throws FetchError<422, types.LoginHandlerApiV5OauthLoginPostResponse422> Validation Error
     */
    SDK.prototype.login_handler_api_v5_oauth_login_post = function (body) {
        return this.core.fetch('/api/v5/oauth/login', 'post', body);
    };
    /**
     * Oauth app authorize page
     *
     * @summary OAuth authorize
     * @throws FetchError<422, types.OauthAuthorizeApiV5OauthAuthorizeGetResponse422> Validation Error
     */
    SDK.prototype.oauth_authorize_api_v5_oauth_authorize_get = function (metadata) {
        return this.core.fetch('/api/v5/oauth/authorize', 'get', metadata);
    };
    /**
     * Authorized the application to do action on behalf you.
     *
     * @summary Oauth:Authorize
     * @throws FetchError<422, types.OauthAuthorizeApiV5OauthAuthorizePostResponse422> Validation Error
     */
    SDK.prototype.oauth_authorize_api_v5_oauth_authorize_post = function (body) {
        return this.core.fetch('/api/v5/oauth/authorize', 'post', body);
    };
    /**
     * Return the user token
     *
     * @summary Oauth:Token
     * @throws FetchError<422, types.OauthTokenApiV5OauthTokenPostResponse422> Validation Error
     */
    SDK.prototype.oauth_token_api_v5_oauth_token_post = function (body) {
        return this.core.fetch('/api/v5/oauth/token', 'post', body);
    };
    /**
     * We use this endpoint only to test if the autorize feature is working. Create new Oauth
     * app and give it this redirect url
     *
     * @summary Oauth:Redirect
     * @throws FetchError<422, types.OauthRedirectApiV5OauthRedirectTestGetResponse422> Validation Error
     */
    SDK.prototype.oauth_redirect_api_v5_oauth_redirect_test_get = function (metadata) {
        return this.core.fetch('/api/v5/oauth/redirect_test', 'get', metadata);
    };
    /**
     * Page to list of applications
     *
     * @summary Oauth application list
     */
    SDK.prototype.oauth_applications_list_api_v5_oauth_applications__get = function () {
        return this.core.fetch('/api/v5/oauth/applications/', 'get');
    };
    /**
     * Page to new application form
     *
     * @summary Oauth new application page
     */
    SDK.prototype.oauth_new_application_page_api_v5_oauth_applications_new_get = function () {
        return this.core.fetch('/api/v5/oauth/applications/new', 'get');
    };
    /**
     * New application handler
     *
     * @summary Create new Oauth app
     * @throws FetchError<422, types.OauthNewApplicationHandlerApiV5OauthApplicationsNewPostResponse422> Validation Error
     */
    SDK.prototype.oauth_new_application_handler_api_v5_oauth_applications_new_post = function (body) {
        return this.core.fetch('/api/v5/oauth/applications/new', 'post', body);
    };
    /**
     * Page see details of single application
     *
     * @summary Edit oauth app page
     * @throws FetchError<422, types.OauthEditApplicationPageApiV5OauthApplicationsOauthApplicationIdEditGetResponse422> Validation Error
     */
    SDK.prototype.oauth_edit_application_page_api_v5_oauth_applications__oauth_application_id__edit_get = function (metadata) {
        return this.core.fetch('/api/v5/oauth/applications/{oauth_application_id}/edit', 'get', metadata);
    };
    /**
     * Page to new application form
     *
     * @summary Edit Oauth app
     * @throws FetchError<422, types.OauthEditApplicationHandlerApiV5OauthApplicationsOauthApplicationIdEditPostResponse422> Validation Error
     */
    SDK.prototype.oauth_edit_application_handler_api_v5_oauth_applications__oauth_application_id__edit_post = function (body, metadata) {
        return this.core.fetch('/api/v5/oauth/applications/{oauth_application_id}/edit', 'post', body, metadata);
    };
    /**
     * Page see details of single application
     *
     * @summary Get oauth app by id
     * @throws FetchError<422, types.OauthApplicationDetailsPageApiV5OauthApplicationsOauthApplicationIdGetResponse422> Validation Error
     */
    SDK.prototype.oauth_application_details_page_api_v5_oauth_applications__oauth_application_id__get = function (metadata) {
        return this.core.fetch('/api/v5/oauth/applications/{oauth_application_id}', 'get', metadata);
    };
    /**
     * Page to list of applications
     *
     * @summary Oauth:Applications:Delete
     * @throws FetchError<422, types.OauthApplicationsDeleteApiV5OauthApplicationsOauthApplicationIdDeletePostResponse422> Validation Error
     */
    SDK.prototype.oauth_applications_delete_api_v5_oauth_applications__oauth_application_id__delete_post = function (metadata) {
        return this.core.fetch('/api/v5/oauth/applications/{oauth_application_id}/delete', 'post', metadata);
    };
    /**
     * Check if email is taken
     *
     * @throws FetchError<422, types.AuthCheckIfEmailTakenApiV5UsersCheckIfEmailTakenPostResponse422> Validation Error
     */
    SDK.prototype.auth_check_if_email_taken_api_v5_users_check_if_email_taken_post = function (body) {
        return this.core.fetch('/api/v5/users/check-if-email-taken', 'post', body);
    };
    /**
     * Login
     *
     * @throws FetchError<422, types.AuthLoginApiV5UsersLoginPostResponse422> Validation Error
     */
    SDK.prototype.auth_login_api_v5_users_login_post = function (body) {
        return this.core.fetch('/api/v5/users/login', 'post', body);
    };
    /**
     * Register
     *
     * @throws FetchError<422, types.AuthRegisterApiV5UsersPostResponse422> Validation Error
     */
    SDK.prototype.auth_register_api_v5_users__post = function (body) {
        return this.core.fetch('/api/v5/users/', 'post', body);
    };
    /**
     * Sends a "Forget Password" email to the email address in the input
     *
     * @summary Forget password
     * @throws FetchError<422, types.AuthForgetPasswordApiV5UsersForgetPasswordPostResponse422> Validation Error
     */
    SDK.prototype.auth_forget_password_api_v5_users_forget_password_post = function (body) {
        return this.core.fetch('/api/v5/users/forget-password', 'post', body);
    };
    /**
     * reset password page
     * :return:
     *
     * @summary Reset password page
     * @throws FetchError<422, types.AuthResetPasswordPageApiV5UsersResetPasswordGetResponse422> Validation Error
     */
    SDK.prototype.auth_reset_password_page_api_v5_users_reset_password_get = function (metadata) {
        return this.core.fetch('/api/v5/users/reset-password', 'get', metadata);
    };
    /**
     * reset user password by token
     * :param user_reset_password:
     * :param users_repo:
     * :param settings:
     * :return:
     *
     * @summary Reset password
     * @throws FetchError<422, types.AuthResetPasswordApiV5UsersResetPasswordPutResponse422> Validation Error
     */
    SDK.prototype.auth_reset_password_api_v5_users_reset_password_put = function (body) {
        return this.core.fetch('/api/v5/users/reset-password', 'put', body);
    };
    /**
     * Get current user
     *
     */
    SDK.prototype.users_get_current_user_api_v5_user__get = function () {
        return this.core.fetch('/api/v5/user/', 'get');
    };
    /**
     * Update current user
     *
     * @throws FetchError<422, types.UsersUpdateCurrentUserApiV5UserPutResponse422> Validation Error
     */
    SDK.prototype.users_update_current_user_api_v5_user__put = function (body) {
        return this.core.fetch('/api/v5/user/', 'put', body);
    };
    /**
     * Hard delete current user account
     *
     * @summary Hard delete current user account
     */
    SDK.prototype.users_delete_api_v5_user__delete = function () {
        return this.core.fetch('/api/v5/user/', 'delete');
    };
    /**
     * Update current user password
     *
     * @throws FetchError<422, types.UsersUpdateCurrentUserPasswordApiV5UserChangePasswordPutResponse422> Validation Error
     */
    SDK.prototype.users_update_current_user_password_api_v5_user_change_password_put = function (body) {
        return this.core.fetch('/api/v5/user/change-password', 'put', body);
    };
    /**
     * Sends OTP to user and updates his phone number. Phone number confirmed field is set to
     * False.
     *
     * @summary Sends OTP to user
     * @throws FetchError<422, types.UsersUpdatePhoneNumberApiV5UserUpdatePhoneNumberPutResponse422> Validation Error
     */
    SDK.prototype.users_update_phone_number_api_v5_user_update_phone_number_put = function (body) {
        return this.core.fetch('/api/v5/user/update-phone-number', 'put', body);
    };
    /**
     * Validate OTP. Phone number confirmed field is set to True if OTP is valid.
     *
     * @summary Validate OTP
     * @throws FetchError<422, types.UsersValidateOtpApiV5UserValidateOtpPostResponse422> Validation Error
     */
    SDK.prototype.users_validate_otp_api_v5_user_validate_otp_post = function (body) {
        return this.core.fetch('/api/v5/user/validate-otp', 'post', body);
    };
    /**
     * Users:Confirm-Email-User
     *
     * @throws FetchError<422, types.UsersConfirmEmailUserApiV5UserEmailConfirmTokenGetResponse422> Validation Error
     */
    SDK.prototype.users_confirm_email_user_api_v5_user_email_confirm__token__get = function (metadata) {
        return this.core.fetch('/api/v5/user/email/confirm/{token}', 'get', metadata);
    };
    /**
     * Check if current user is pavlok admin
     *
     * @summary Check if user is pavlok admin
     */
    SDK.prototype.users_is_pavlok_admin_api_v5_user_is_pavlok_admin_get = function () {
        return this.core.fetch('/api/v5/user/is-pavlok-admin', 'get');
    };
    /**
     * Soft delete current user account
     *
     * @summary Soft delete current user account
     */
    SDK.prototype.users_soft_delete_api_v5_user_delete_account_delete = function () {
        return this.core.fetch('/api/v5/user/delete-account', 'delete');
    };
    /**
     * Check if user is root
     *
     */
    SDK.prototype.users_check_current_user_role_root_api_v5_user_role_is_root_get = function () {
        return this.core.fetch('/api/v5/user/role/is-root', 'get');
    };
    /**
     * Check if user is super admin
     *
     */
    SDK.prototype.users_check_current_user_role_super_admin_api_v5_user_role_is_super_admin_get = function () {
        return this.core.fetch('/api/v5/user/role/is-super-admin', 'get');
    };
    /**
     * Check if user is admin
     *
     */
    SDK.prototype.users_check_current_user_role_admin_api_v5_user_role_is_admin_get = function () {
        return this.core.fetch('/api/v5/user/role/is-admin', 'get');
    };
    /**
     * Check if user is coach
     *
     */
    SDK.prototype.users_check_current_user_role_coach_api_v5_user_role_is_coach_get = function () {
        return this.core.fetch('/api/v5/user/role/is-coach', 'get');
    };
    /**
     * Check if user is support
     *
     */
    SDK.prototype.users_check_current_user_role_support_api_v5_user_role_is_support_get = function () {
        return this.core.fetch('/api/v5/user/role/is-support', 'get');
    };
    /**
     * Create (or update if exists) user setting
     *
     * @summary Upsert user setting
     * @throws FetchError<422, types.UserSettingsUpsertApiV5UserSettingsPostResponse422> Validation Error
     */
    SDK.prototype.user_settings_upsert_api_v5_user_settings__post = function (body) {
        return this.core.fetch('/api/v5/user/settings/', 'post', body);
    };
    /**
     * Delete user setting
     *
     * @summary Delete user setting
     * @throws FetchError<422, types.UserSettingsDeleteApiV5UserSettingsDeleteResponse422> Validation Error
     */
    SDK.prototype.user_settings_delete_api_v5_user_settings__delete = function (metadata) {
        return this.core.fetch('/api/v5/user/settings/', 'delete', metadata);
    };
    /**
     * Search for user
     *
     * @summary Search for user
     * @throws FetchError<422, types.UsersSearchApiV5UsersSearchGetResponse422> Validation Error
     */
    SDK.prototype.users_search_api_v5_users_search_get = function (metadata) {
        return this.core.fetch('/api/v5/users/search', 'get', metadata);
    };
    /**
     * Get user with friendship by id
     *
     * @summary Get user with friendship
     * @throws FetchError<422, types.UsersGetUserByIdApiV5UsersGetUserByIdGetResponse422> Validation Error
     */
    SDK.prototype.users_get_user_by_id_api_v5_users_get_user_by_id_get = function (metadata) {
        return this.core.fetch('/api/v5/users/get-user-by-id', 'get', metadata);
    };
    /**
     * Get friends suggestions
     *
     * @summary Get friends suggestions
     */
    SDK.prototype.users_get_friends_suggestions_api_v5_users_friends_suggestions_get = function () {
        return this.core.fetch('/api/v5/users/friends-suggestions', 'get');
    };
    /**
     * Get user info
     * @return: IftttUser
     *
     * @summary IFTTT get info
     */
    SDK.prototype.ifttt_v1_user_get_info_api_v5_ifttt_v1_user_info_get = function () {
        return this.core.fetch('/api/v5/ifttt/v1/user/info', 'get');
    };
    /**
     * IFTTT status
     *
     */
    SDK.prototype.ifttt_v1_status_api_v5_ifttt_v1_status_get = function () {
        return this.core.fetch('/api/v5/ifttt/v1/status', 'get');
    };
    /**
     * IFTTT test setup
     *
     */
    SDK.prototype.ifttt_v1_test_setup_api_v5_ifttt_v1_test_setup_post = function () {
        return this.core.fetch('/api/v5/ifttt/v1/test/setup', 'post');
    };
    /**
     * IFTTT vibrate action
     *
     * @throws FetchError<422, types.IftttV1ActionsVibrateApiV5IftttV1ActionsVibratePostResponse422> Validation Error
     */
    SDK.prototype.ifttt_v1_actions_vibrate_api_v5_ifttt_v1_actions_vibrate_post = function (body) {
        return this.core.fetch('/api/v5/ifttt/v1/actions/vibrate', 'post', body);
    };
    /**
     * IFTTT vibrate options
     *
     * @throws FetchError<422, types.IftttV1ActionsVibrateOptionsApiV5IftttV1ActionsVibrateFieldsValueOptionsPostResponse422> Validation Error
     */
    SDK.prototype.ifttt_v1_actions_vibrate_options_api_v5_ifttt_v1_actions_vibrate_fields_value_options_post = function (body) {
        return this.core.fetch('/api/v5/ifttt/v1/actions/vibrate/fields/value/options', 'post', body);
    };
    /**
     * IFTTT zap action
     *
     * @throws FetchError<422, types.IftttV1ActionsZapApiV5IftttV1ActionsZapPostResponse422> Validation Error
     */
    SDK.prototype.ifttt_v1_actions_zap_api_v5_ifttt_v1_actions_zap_post = function (body) {
        return this.core.fetch('/api/v5/ifttt/v1/actions/zap', 'post', body);
    };
    /**
     * IFTTT zap options
     *
     * @throws FetchError<422, types.IftttV1ActionsZapOptionsApiV5IftttV1ActionsZapFieldsValueOptionsPostResponse422> Validation Error
     */
    SDK.prototype.ifttt_v1_actions_zap_options_api_v5_ifttt_v1_actions_zap_fields_value_options_post = function (body) {
        return this.core.fetch('/api/v5/ifttt/v1/actions/zap/fields/value/options', 'post', body);
    };
    /**
     * IFTTT beep action
     *
     * @throws FetchError<422, types.IftttV1ActionsBeepApiV5IftttV1ActionsBeepPostResponse422> Validation Error
     */
    SDK.prototype.ifttt_v1_actions_beep_api_v5_ifttt_v1_actions_beep_post = function (body) {
        return this.core.fetch('/api/v5/ifttt/v1/actions/beep', 'post', body);
    };
    /**
     * IFTTT beep options
     *
     * @throws FetchError<422, types.IftttV1ActionsBeepOptionsApiV5IftttV1ActionsBeepFieldsValueOptionsPostResponse422> Validation Error
     */
    SDK.prototype.ifttt_v1_actions_beep_options_api_v5_ifttt_v1_actions_beep_fields_value_options_post = function (body) {
        return this.core.fetch('/api/v5/ifttt/v1/actions/beep/fields/value/options', 'post', body);
    };
    /**
     * IFTTT led action
     *
     * @throws FetchError<422, types.IftttV1ActionsLedApiV5IftttV1ActionsLedPostResponse422> Validation Error
     */
    SDK.prototype.ifttt_v1_actions_led_api_v5_ifttt_v1_actions_led_post = function (body) {
        return this.core.fetch('/api/v5/ifttt/v1/actions/led', 'post', body);
    };
    /**
     * IFTTT led options
     *
     * @throws FetchError<422, types.IftttV1ActionsLedOptionsApiV5IftttV1ActionsLedFieldsValueOptionsPostResponse422> Validation Error
     */
    SDK.prototype.ifttt_v1_actions_led_options_api_v5_ifttt_v1_actions_led_fields_value_options_post = function (body) {
        return this.core.fetch('/api/v5/ifttt/v1/actions/led/fields/value/options', 'post', body);
    };
    /**
     * Get tasks
     *
     */
    SDK.prototype.tasks_tasks_get_current_user_tasks_api_v5_tasks_tasks_get = function () {
        return this.core.fetch('/api/v5/tasks/tasks', 'get');
    };
    /**
     * Create task
     *
     * @throws FetchError<422, types.TasksTasksCreateTaskApiV5TasksTasksPostResponse422> Validation Error
     */
    SDK.prototype.tasks_tasks_create_task_api_v5_tasks_tasks_post = function (body) {
        return this.core.fetch('/api/v5/tasks/tasks', 'post', body);
    };
    /**
     * Get tasks by list id
     *
     * @throws FetchError<422, types.TasksTasksGetCurrentUserTasksByListIdApiV5TasksTasksListListIdGetResponse422> Validation Error
     */
    SDK.prototype.tasks_tasks_get_current_user_tasks_by_list_id_api_v5_tasks_tasks_list__list_id__get = function (metadata) {
        return this.core.fetch('/api/v5/tasks/tasks/list/{list_id}', 'get', metadata);
    };
    /**
     * Update task
     *
     * @throws FetchError<422, types.TasksTasksUpdateTaskApiV5TasksTasksTaskIdPutResponse422> Validation Error
     */
    SDK.prototype.tasks_tasks_update_task_api_v5_tasks_tasks__task_id__put = function (body, metadata) {
        return this.core.fetch('/api/v5/tasks/tasks/{task_id}', 'put', body, metadata);
    };
    /**
     * Delete task
     *
     * @throws FetchError<422, types.TasksTasksDeleteTaskApiV5TasksTasksTaskIdDeleteResponse422> Validation Error
     */
    SDK.prototype.tasks_tasks_delete_task_api_v5_tasks_tasks__task_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/tasks/tasks/{task_id}', 'delete', metadata);
    };
    /**
     * Get tasks lists
     *
     */
    SDK.prototype.tasks_lists_get_current_user_tasks_lists_api_v5_tasks_lists_get = function () {
        return this.core.fetch('/api/v5/tasks/lists', 'get');
    };
    /**
     * Create tasks lists
     *
     * @throws FetchError<422, types.TasksListsCreateTasksListApiV5TasksListsPostResponse422> Validation Error
     */
    SDK.prototype.tasks_lists_create_tasks_list_api_v5_tasks_lists_post = function (body) {
        return this.core.fetch('/api/v5/tasks/lists', 'post', body);
    };
    /**
     * Update tasks list
     *
     * @throws FetchError<422, types.TasksListsUpdateTasksListApiV5TasksListsTasksListIdPutResponse422> Validation Error
     */
    SDK.prototype.tasks_lists_update_tasks_list_api_v5_tasks_lists__tasks_list_id__put = function (body, metadata) {
        return this.core.fetch('/api/v5/tasks/lists/{tasks_list_id}', 'put', body, metadata);
    };
    /**
     * Delete tasks list
     *
     * @throws FetchError<422, types.TasksListsDeleteTasksListApiV5TasksListsTasksListIdDeleteResponse422> Validation Error
     */
    SDK.prototype.tasks_lists_delete_tasks_list_api_v5_tasks_lists__tasks_list_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/tasks/lists/{tasks_list_id}', 'delete', metadata);
    };
    /**
     * Get category with it contents
     *
     * @throws FetchError<422, types.ContentsCategoriesGetOneWithContentsApiV5ContentsCategoriesContentsCategoryIdGetResponse422> Validation Error
     */
    SDK.prototype.contents_categories_get_one_with_contents_api_v5_contents_categories__contents_category_id__get = function (metadata) {
        return this.core.fetch('/api/v5/contents/categories/{contents_category_id}', 'get', metadata);
    };
    /**
     * Get all visible habits
     *
     * @summary Get all visible habits
     */
    SDK.prototype.habits_read_visible_api_v5_habits_habits__get = function () {
        return this.core.fetch('/api/v5/habits/habits/', 'get');
    };
    /**
     * Get one habit
     *
     * @summary Get one habit
     * @throws FetchError<422, types.HabitsGetOneApiV5HabitsHabitsHabitIdGetResponse422> Validation Error
     */
    SDK.prototype.habits_get_one_api_v5_habits_habits__habit_id__get = function (metadata) {
        return this.core.fetch('/api/v5/habits/habits/{habit_id}', 'get', metadata);
    };
    /**
     * Update Individual Habit
     *
     * @summary Update Individual Habit
     * @throws FetchError<422, types.HabitsUpdateIndividualApiV5HabitsHabitsIndividualPutResponse422> Validation Error
     */
    SDK.prototype.habits_update_individual_api_v5_habits_habits_individual_put = function (body) {
        return this.core.fetch('/api/v5/habits/habits/individual', 'put', body);
    };
    /**
     * Get all User Habits
     *
     * @summary Get all User Habits
     */
    SDK.prototype.user_habits_read_all_api_v5_habits_user_habits_all_get = function () {
        return this.core.fetch('/api/v5/habits/user-habits/all', 'get');
    };
    /**
     * Get all active User Habits for a specific date (Home page)
     *
     * @summary Get active User Habits
     * @throws FetchError<422, types.UserHabitsReadAllActiveApiV5HabitsUserHabitsAllActiveGetResponse422> Validation Error
     */
    SDK.prototype.user_habits_read_all_active_api_v5_habits_user_habits_all_active_get = function (metadata) {
        return this.core.fetch('/api/v5/habits/user-habits/all-active', 'get', metadata);
    };
    /**
     * Get User Habit
     *
     * @summary Get User Habit
     * @throws FetchError<422, types.UserHabitsReadApiV5HabitsUserHabitsGetResponse422> Validation Error
     */
    SDK.prototype.user_habits_read_api_v5_habits_user_habits__get = function (metadata) {
        return this.core.fetch('/api/v5/habits/user-habits/', 'get', metadata);
    };
    /**
     * Update the the price and the repetition_days of a user habit + the answers to the habit
     * questions
     *
     * @summary Update user habit
     * @throws FetchError<422, types.UserHabitsUpdateApiV5HabitsUserHabitsPutResponse422> Validation Error
     */
    SDK.prototype.user_habits_update_api_v5_habits_user_habits__put = function (body) {
        return this.core.fetch('/api/v5/habits/user-habits/', 'put', body);
    };
    /**
     * Create User Habit
     *
     * @summary Create User Habit
     * @throws FetchError<422, types.UserHabitsCreateApiV5HabitsUserHabitsPostResponse422> Validation Error
     */
    SDK.prototype.user_habits_create_api_v5_habits_user_habits__post = function (body) {
        return this.core.fetch('/api/v5/habits/user-habits/', 'post', body);
    };
    /**
     * Create Individual User Habit. (Used only for creation. For enabling use
     * user-habit:create
     *
     * @summary Create Individual User Habit
     * @throws FetchError<422, types.UserHabitsCreateIndividualApiV5HabitsUserHabitsIndividualPostResponse422> Validation Error
     */
    SDK.prototype.user_habits_create_individual_api_v5_habits_user_habits_individual_post = function (body) {
        return this.core.fetch('/api/v5/habits/user-habits/individual', 'post', body);
    };
    /**
     * Update the goal of an already existing user habit
     *
     * @summary Update the goal of a user habit
     * @throws FetchError<422, types.UserHabitsUpdateGoalApiV5HabitsUserHabitsGoalPutResponse422> Validation Error
     */
    SDK.prototype.user_habits_update_goal_api_v5_habits_user_habits_goal_put = function (body) {
        return this.core.fetch('/api/v5/habits/user-habits/goal', 'put', body);
    };
    /**
     * Get all habit logs within the specified time interval
     *
     * @summary Get habit logs
     * @throws FetchError<422, types.HabitGoalsReadApiV5HabitsHabitGoalsGetResponse422> Validation Error
     */
    SDK.prototype.habit_goals_read_api_v5_habits_habit_goals__get = function (metadata) {
        return this.core.fetch('/api/v5/habits/habit-goals/', 'get', metadata);
    };
    /**
     * Get all the number of times the user completed his goal for each habit
     *
     * @summary Get habit goals achievements
     */
    SDK.prototype.habit_goals_get_achievements_api_v5_habits_habit_goals_achievements_get = function () {
        return this.core.fetch('/api/v5/habits/habit-goals/achievements', 'get');
    };
    /**
     * Get all habit logs for the specified habit
     *
     * @summary Get habit logs
     * @throws FetchError<422, types.HabitLogsGetAllApiV5HabitsHabitLogsGetResponse422> Validation Error
     */
    SDK.prototype.habit_logs_get_all_api_v5_habits_habit_logs__get = function (metadata) {
        return this.core.fetch('/api/v5/habits/habit-logs/', 'get', metadata);
    };
    /**
     * Create habit log. Add this value to the corresponding goal if it exists, if it doesn't
     * exist, it creates a new one.
     *
     * @summary Create habit log
     * @throws FetchError<422, types.HabitLogsCreateApiV5HabitsHabitLogsPostResponse422> Validation Error
     */
    SDK.prototype.habit_logs_create_api_v5_habits_habit_logs__post = function (body) {
        return this.core.fetch('/api/v5/habits/habit-logs/', 'post', body);
    };
    /**
     * Delete Habit log
     *
     * @summary Delete Habit log
     * @throws FetchError<422, types.HabitLogsDeleteApiV5HabitsHabitLogsDeleteResponse422> Validation Error
     */
    SDK.prototype.habit_logs_delete_api_v5_habits_habit_logs__delete = function (metadata) {
        return this.core.fetch('/api/v5/habits/habit-logs/', 'delete', metadata);
    };
    /**
     * Get the specified habit log
     *
     * @summary Get habit log
     * @throws FetchError<422, types.HabitLogsGetOneApiV5HabitsHabitLogsHabitLogIdGetResponse422> Validation Error
     */
    SDK.prototype.habit_logs_get_one_api_v5_habits_habit_logs__habit_log_id__get = function (metadata) {
        return this.core.fetch('/api/v5/habits/habit-logs/{habit_log_id}', 'get', metadata);
    };
    /**
     * Create multiple habit logs.
     *
     * @summary Create multiple habit logs.
     * @throws FetchError<422, types.HabitLogsCreateMultipleApiV5HabitsHabitLogsMultiplePostResponse422> Validation Error
     */
    SDK.prototype.habit_logs_create_multiple_api_v5_habits_habit_logs_multiple_post = function (body) {
        return this.core.fetch('/api/v5/habits/habit-logs/multiple', 'post', body);
    };
    /**
     * Get all habit records
     *
     * @summary Get all habit records
     * @throws FetchError<422, types.HabitRecordsReadApiV5HabitsHabitRecordsGetResponse422> Validation Error
     */
    SDK.prototype.habit_records_read_api_v5_habits_habit_records__get = function (metadata) {
        return this.core.fetch('/api/v5/habits/habit-records/', 'get', metadata);
    };
    /**
     * Get highest records for the user
     *
     * @summary Get highest records
     */
    SDK.prototype.habit_records_read_all_api_v5_habits_habit_records_all_get = function () {
        return this.core.fetch('/api/v5/habits/habit-records/all', 'get');
    };
    /**
     * Get the challenges where the coach is assigned
     *
     * @summary Get the challenges where the coach is assigned
     */
    SDK.prototype.coaching_get_coach_challenges_api_v5_challenges_coaching_my_challenges_get = function () {
        return this.core.fetch('/api/v5/challenges/coaching/my-challenges', 'get');
    };
    /**
     * Update the status of the link between the user habit and the challenge. If true, means
     * it's accepted.If false, means that it's rejected and it will be deleted
     *
     * @summary Accept/Reject user habit for challenge
     * @throws FetchError<422, types.CoachingUpdateUserHabitStatusApiV5ChallengesCoachingChallengeUserHabitChallengeUserHabitIdPatchResponse422> Validation Error
     */
    SDK.prototype.coaching_update_user_habit_status_api_v5_challenges_coaching_challenge_user_habit__challenge_user_habit_id__patch = function (body, metadata) {
        return this.core.fetch('/api/v5/challenges/coaching/challenge-user-habit/{challenge_user_habit_id}', 'patch', body, metadata);
    };
    /**
     * Get linked user habits with a challenge for a user
     *
     * @summary Get linked user habits with a challenge for a user
     * @throws FetchError<422, types.CoachingGetLinkedUserHabitsApiV5ChallengesCoachingChallengeChallengeIdUserUserIdUserHabitsGetResponse422> Validation Error
     */
    SDK.prototype.coaching_get_linked_user_habits_api_v5_challenges_coaching_challenge__challenge_id__user__user_id__user_habits_get = function (metadata) {
        return this.core.fetch('/api/v5/challenges/coaching/challenge/{challenge_id}/user/{user_id}/user-habits', 'get', metadata);
    };
    /**
     * Create challenge team
     *
     * @summary Create challenge team
     * @throws FetchError<422, types.CoachingCreateChallengeTeamApiV5ChallengesCoachingTeamsPostResponse422> Validation Error
     */
    SDK.prototype.coaching_create_challenge_team_api_v5_challenges_coaching_teams_post = function (body) {
        return this.core.fetch('/api/v5/challenges/coaching/teams', 'post', body);
    };
    /**
     * Update challenge team
     *
     * @summary Update challenge team
     * @throws FetchError<422, types.CoachingUpdateChallengeTeamApiV5ChallengesCoachingTeamsTeamIdPutResponse422> Validation Error
     */
    SDK.prototype.coaching_update_challenge_team_api_v5_challenges_coaching_teams__team_id__put = function (body, metadata) {
        return this.core.fetch('/api/v5/challenges/coaching/teams/{team_id}', 'put', body, metadata);
    };
    /**
     * Delete challenge team
     *
     * @summary Delete challenge team
     * @throws FetchError<422, types.CoachingDeleteChallengeTeamApiV5ChallengesCoachingTeamsTeamIdDeleteResponse422> Validation Error
     */
    SDK.prototype.coaching_delete_challenge_team_api_v5_challenges_coaching_teams__team_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/challenges/coaching/teams/{team_id}', 'delete', metadata);
    };
    /**
     * Reassign a participant from a team to another within the same challenge
     *
     * @summary Reassign a participant
     * @throws FetchError<422, types.CoachingReassignParticipantApiV5ChallengesCoachingTeamsOldTeamIdReassignPutResponse422> Validation Error
     */
    SDK.prototype.coaching_reassign_participant_api_v5_challenges_coaching_teams__old_team_id__reassign_put = function (body, metadata) {
        return this.core.fetch('/api/v5/challenges/coaching/teams/{old_team_id}/reassign', 'put', body, metadata);
    };
    /**
     * Create a participant in challenge team
     *
     * @summary Create a participant in challenge team
     * @throws FetchError<422, types.CoachingCreateParticipantApiV5ChallengesCoachingParticipantsPostResponse422> Validation Error
     */
    SDK.prototype.coaching_create_participant_api_v5_challenges_coaching_participants_post = function (body) {
        return this.core.fetch('/api/v5/challenges/coaching/participants', 'post', body);
    };
    /**
     * Delete a participant in challenge team
     *
     * @summary Delete a participant in challenge team
     * @throws FetchError<422, types.CoachingDeleteParticipantApiV5ChallengesCoachingParticipantsParticipantIdDeleteResponse422> Validation Error
     */
    SDK.prototype.coaching_delete_participant_api_v5_challenges_coaching_participants__participant_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/challenges/coaching/participants/{participant_id}', 'delete', metadata);
    };
    /**
     * Get all participants of a challenge
     *
     * @summary Get all participants of a challenge
     * @throws FetchError<422, types.CoachingGetParticipantsApiV5ChallengesCoachingParticipantsGetResponse422> Validation Error
     */
    SDK.prototype.coaching_get_participants_api_v5_challenges_coaching_participants__get = function (metadata) {
        return this.core.fetch('/api/v5/challenges/coaching/participants/', 'get', metadata);
    };
    /**
     * Ends the challenge by setting the end date to today
     *
     * @summary Ends challenge
     * @throws FetchError<422, types.CoachingEndChallengeApiV5ChallengesCoachingChallengesChallengeIdEndPutResponse422> Validation Error
     */
    SDK.prototype.coaching_end_challenge_api_v5_challenges_coaching_challenges__challenge_id__end_put = function (metadata) {
        return this.core.fetch('/api/v5/challenges/coaching/challenges/{challenge_id}/end', 'put', metadata);
    };
    /**
     * Get all challenges joined by the user
     *
     * @summary Get all challenges joined by the user
     */
    SDK.prototype.challenges_get_joined_api_v5_challenges_joined_get = function () {
        return this.core.fetch('/api/v5/challenges/joined', 'get');
    };
    /**
     * Get all active global challenges
     *
     * @summary Get all active global challenges
     */
    SDK.prototype.challenges_get_global_api_v5_challenges_global_get = function () {
        return this.core.fetch('/api/v5/challenges/global', 'get');
    };
    /**
     * Get challenge leaderboard
     *
     * @summary Get challenge leaderboard
     * @throws FetchError<422, types.ChallengesGetLeaderboardApiV5ChallengesChallengeIdLeaderboardGetResponse422> Validation Error
     */
    SDK.prototype.challenges_get_leaderboard_api_v5_challenges__challenge_id__leaderboard_get = function (metadata) {
        return this.core.fetch('/api/v5/challenges/{challenge_id}/leaderboard', 'get', metadata);
    };
    /**
     * Get challenge details
     *
     * @summary Get challenge details
     * @throws FetchError<422, types.ChallengesGetOneApiV5ChallengesChallengeIdGetResponse422> Validation Error
     */
    SDK.prototype.challenges_get_one_api_v5_challenges__challenge_id__get = function (metadata) {
        return this.core.fetch('/api/v5/challenges/{challenge_id}', 'get', metadata);
    };
    /**
     * Sync challenges leaderboards with the latest data
     *
     * @summary Sync challenges leaderboards with the latest data
     * @throws FetchError<422, types.ChallengesSyncOneLeaderboardApiV5ChallengesChallengeIdSyncLeaderboardPutResponse422> Validation Error
     */
    SDK.prototype.challenges_sync_one_leaderboard_api_v5_challenges__challenge_id__sync_leaderboard_put = function (metadata) {
        return this.core.fetch('/api/v5/challenges/{challenge_id}/sync-leaderboard', 'put', metadata);
    };
    /**
     * Join challenge
     *
     * @summary Join challenge
     * @throws FetchError<422, types.ChallengesJoinApiV5ChallengesChallengeIdJoinPostResponse422> Validation Error
     */
    SDK.prototype.challenges_join_api_v5_challenges__challenge_id__join_post = function (metadata) {
        return this.core.fetch('/api/v5/challenges/{challenge_id}/join', 'post', metadata);
    };
    /**
     * Get the linked user habits with a challenge
     *
     * @summary Get the linked user habits with a challenge
     * @throws FetchError<422, types.ChallengesGetLinkedUserHabitsApiV5ChallengesChallengeIdUserHabitsGetResponse422> Validation Error
     */
    SDK.prototype.challenges_get_linked_user_habits_api_v5_challenges__challenge_id__user_habits_get = function (metadata) {
        return this.core.fetch('/api/v5/challenges/{challenge_id}/user-habits', 'get', metadata);
    };
    /**
     * Link user habit with challenge
     *
     * @summary Link user habit with challenge
     * @throws FetchError<422, types.ChallengesLinkUserHabitsApiV5ChallengesChallengeIdUserHabitsPostResponse422> Validation Error
     */
    SDK.prototype.challenges_link_user_habits_api_v5_challenges__challenge_id__user_habits_post = function (body, metadata) {
        return this.core.fetch('/api/v5/challenges/{challenge_id}/user-habits', 'post', body, metadata);
    };
    /**
     * Send a challenge invite to a user
     *
     * @summary Send a challenge invite to a user
     * @throws FetchError<422, types.ChallengesSendInviteApiV5ChallengesChallengeIdSendInviteUserIdPostResponse422> Validation Error
     */
    SDK.prototype.challenges_send_invite_api_v5_challenges__challenge_id__send_invite__user_id__post = function (metadata) {
        return this.core.fetch('/api/v5/challenges/{challenge_id}/send-invite/{user_id}', 'post', metadata);
    };
    /**
     * Leave a challenge
     *
     * @summary Leave a challenge
     * @throws FetchError<422, types.ChallengesLeaveApiV5ChallengesChallengeIdLeavePostResponse422> Validation Error
     */
    SDK.prototype.challenges_leave_api_v5_challenges__challenge_id__leave_post = function (metadata) {
        return this.core.fetch('/api/v5/challenges/{challenge_id}/leave', 'post', metadata);
    };
    /**
     * Get the list of product from shopify (from vendor 'Pavlok Volts Store') Ignore any
     * product without a valid tag (VoltsCost:XXXXX) XXX a positive int
     *
     * @summary Get products from shopify
     */
    SDK.prototype.pv_store_get_products_api_v5_pv_store_products_get = function () {
        return this.core.fetch('/api/v5/pv-store/products', 'get');
    };
    /**
     * Get Current user orders
     *
     * @summary Get orders
     */
    SDK.prototype.pv_store_get_user_orders_api_v5_pv_store_user_orders_get = function () {
        return this.core.fetch('/api/v5/pv-store/user-orders', 'get');
    };
    /**
     * Make a shopify order
     *
     * @summary Make a shopify order
     * @throws FetchError<422, types.AuthVoltsStoreApiV5PvStoreRedemptionPostResponse422> Validation Error
     */
    SDK.prototype.auth_volts_store_api_v5_pv_store_redemption_post = function (body) {
        return this.core.fetch('/api/v5/pv-store/redemption', 'post', body);
    };
    /**
     * Get current user sleep datasets
     *
     * @summary Get sleep datasets
     * @throws FetchError<422, types.SleepDatasetsIndexApiV5SleepDatasetGetResponse422> Validation Error
     */
    SDK.prototype.sleep_datasets_index_api_v5_sleep_dataset__get = function (metadata) {
        return this.core.fetch('/api/v5/sleep-dataset/', 'get', metadata);
    };
    /**
     * Add sleep dataset to the current user
     *
     * @summary Create sleep dataset
     * @throws FetchError<422, types.SleepDatasetsCreateApiV5SleepDatasetPostResponse422> Validation Error
     */
    SDK.prototype.sleep_datasets_create_api_v5_sleep_dataset__post = function (body) {
        return this.core.fetch('/api/v5/sleep-dataset/', 'post', body);
    };
    /**
     * Get current user sleep dataset by id
     *
     * @summary Sleep-Datasets:Get-One
     * @throws FetchError<422, types.SleepDatasetsGetOneApiV5SleepDatasetSessionSleepDatasetIdGetResponse422> Validation Error
     */
    SDK.prototype.sleep_datasets_get_one_api_v5_sleep_dataset_session__sleep_dataset_id__get = function (metadata) {
        return this.core.fetch('/api/v5/sleep-dataset/session/{sleep_dataset_id}', 'get', metadata);
    };
    /**
     * Delete sleep dataset to the current user
     *
     * @summary Delete sleep dataset
     * @throws FetchError<422, types.SleepDatasetsDeleteApiV5SleepDatasetSleepDatasetIdDeleteResponse422> Validation Error
     */
    SDK.prototype.sleep_datasets_delete_api_v5_sleep_dataset__sleep_dataset_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/sleep-dataset/{sleep_dataset_id}', 'delete', metadata);
    };
    /**
     * Get current user notifications
     *
     * @summary Notifications:Index
     * @throws FetchError<422, types.NotificationsIndexApiV5NotificationsGetResponse422> Validation Error
     */
    SDK.prototype.notifications_index_api_v5_notifications__get = function (metadata) {
        return this.core.fetch('/api/v5/notifications/', 'get', metadata);
    };
    /**
     * Get new notifications since the provided timestamp
     *
     * @summary Notifications:New
     * @throws FetchError<422, types.NotificationsNewApiV5NotificationsNewGetResponse422> Validation Error
     */
    SDK.prototype.notifications_new_api_v5_notifications_new__get = function (metadata) {
        return this.core.fetch('/api/v5/notifications/new/', 'get', metadata);
    };
    /**
     * Get current user notifications
     *
     * @summary Notifications:Bottom Sheets
     */
    SDK.prototype.notifications_bottom_sheets_api_v5_notifications_bottom_sheets__get = function () {
        return this.core.fetch('/api/v5/notifications/bottom-sheets/', 'get');
    };
    /**
     * Get notification by id
     *
     * @summary Notifications:Get-One
     * @throws FetchError<422, types.NotificationsGetOneApiV5NotificationsGetOneNotificationIdGetResponse422> Validation Error
     */
    SDK.prototype.notifications_get_one_api_v5_notifications_get_one__notification_id__get = function (metadata) {
        return this.core.fetch('/api/v5/notifications/get-one/{notification_id}', 'get', metadata);
    };
    /**
     * Send a push notification
     *
     * @summary Notifications:Create
     * @throws FetchError<422, types.NotificationsCreateApiV5NotificationsSendPushNotificationPostResponse422> Validation Error
     */
    SDK.prototype.notifications_create_api_v5_notifications_send_push_notification_post = function (body) {
        return this.core.fetch('/api/v5/notifications/send-push-notification', 'post', body);
    };
    /**
     * Mark all unread notifications as read of the user
     *
     * @summary Notifications:Mark-All-Read
     */
    SDK.prototype.notifications_mark_all_read_api_v5_notifications_mark_all_read_put = function () {
        return this.core.fetch('/api/v5/notifications/mark-all-read', 'put');
    };
    /**
     * Send a push notification
     *
     * @summary Notifications:Update
     * @throws FetchError<422, types.NotificationsUpdateApiV5NotificationsNotificationIdPutResponse422> Validation Error
     */
    SDK.prototype.notifications_update_api_v5_notifications__notification_id__put = function (body, metadata) {
        return this.core.fetch('/api/v5/notifications/{notification_id}', 'put', body, metadata);
    };
    /**
     * Get current user notifications
     *
     * @summary Notifications:Delete
     * @throws FetchError<422, types.NotificationsDeleteApiV5NotificationsNotificationIdDeleteResponse422> Validation Error
     */
    SDK.prototype.notifications_delete_api_v5_notifications__notification_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/notifications/{notification_id}', 'delete', metadata);
    };
    /**
     * Create webhook. Category value must be one of the predefined values for webhooks'
     * categories
     *
     * @summary Create webhook
     * @throws FetchError<422, types.WebhooksCreateApiV5WebhooksPostResponse422> Validation Error
     */
    SDK.prototype.webhooks_create_api_v5_webhooks_post = function (body) {
        return this.core.fetch('/api/v5/webhooks', 'post', body);
    };
    /**
     * Execute all user's webhooks of the specified category. Use case example: When the user
     * receives a call on his mobile, the mobile app will send a request to this endpoint with
     * the call data, then this function will send a request with the call data to all the
     * webhooks of this user of the specified category.
     *
     * @summary Execute webhook
     * @throws FetchError<422, types.WebhooksExecuteApiV5WebhooksExecutePostResponse422> Validation Error
     */
    SDK.prototype.webhooks_execute_api_v5_webhooks_execute_post = function (body) {
        return this.core.fetch('/api/v5/webhooks/execute', 'post', body);
    };
    /**
     * Deletes the specified webhook.
     *
     * @summary Delete webhook
     * @throws FetchError<422, types.WebhooksDeleteApiV5WebhooksWebhookIdDeleteResponse422> Validation Error
     */
    SDK.prototype.webhooks_delete_api_v5_webhooks__webhook_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/webhooks/{webhook_id}', 'delete', metadata);
    };
    /**
     * Update phone device if exist else insert new phone device.A device is identified by
     * (user_id, hardware_identifier)
     *
     * @summary Upsert phone device.
     * @throws FetchError<422, types.PhoneDevicesUpsertApiV5PhoneDevicesPutResponse422> Validation Error
     */
    SDK.prototype.phone_devices_upsert_api_v5_phone_devices__put = function (body) {
        return this.core.fetch('/api/v5/phone-devices/', 'put', body);
    };
    /**
     * Remove phone device: delete the instance from the phone devices table and also the
     * channels table
     *
     * @summary Remove phone device
     * @throws FetchError<422, types.PhoneDevicesDeleteApiV5PhoneDevicesDeleteResponse422> Validation Error
     */
    SDK.prototype.phone_devices_delete_api_v5_phone_devices__delete = function (metadata) {
        return this.core.fetch('/api/v5/phone-devices/', 'delete', metadata);
    };
    /**
     * Create user feedback
     *
     * @summary Create user feedback
     * @throws FetchError<422, types.FeedbacksCreateApiV5FeedbacksPostResponse422> Validation Error
     */
    SDK.prototype.feedbacks_create_api_v5_feedbacks__post = function (body) {
        return this.core.fetch('/api/v5/feedbacks/', 'post', body);
    };
    /**
     * Create a stimulus and send to current user
     *
     * @summary Create and send a stimulus
     * @throws FetchError<422, types.StimulusCreateApiV5StimulusSendPostResponse422> Validation Error
     */
    SDK.prototype.stimulus_create_api_v5_stimulus_send_post = function (body) {
        return this.core.fetch('/api/v5/stimulus/send', 'post', body);
    };
    /**
     * Get all stimulus sent to current user
     *
     * @summary Get all stimulus
     */
    SDK.prototype.stimulus_get_stimulus_current_user_api_v5_stimulus_sent_me_get = function () {
        return this.core.fetch('/api/v5/stimulus/sent/me', 'get');
    };
    /**
     * Get Stimulus by id for the current user
     *
     * @summary Get Stimulus by id
     * @throws FetchError<422, types.StimulusGetByIdApiV5StimulusStimulusIdGetResponse422> Validation Error
     */
    SDK.prototype.stimulus_get_by_id_api_v5_stimulus__stimulus_id__get = function (metadata) {
        return this.core.fetch('/api/v5/stimulus/{stimulus_id}', 'get', metadata);
    };
    /**
     * Delete stimulus by id
     *
     * @summary Delete stimulus
     * @throws FetchError<422, types.StimulusDeleteApiV5StimulusStimulusIdDeleteResponse422> Validation Error
     */
    SDK.prototype.stimulus_delete_api_v5_stimulus__stimulus_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/stimulus/{stimulus_id}', 'delete', metadata);
    };
    /**
     * Get current user volts
     *
     */
    SDK.prototype.wallets_get_current_user_volts_api_v5_wallets_volts_get = function () {
        return this.core.fetch('/api/v5/wallets/volts', 'get');
    };
    /**
     * Send volts to another user
     *
     * @summary Send volts
     * @throws FetchError<422, types.WalletsSendVoltsApiV5WalletsSendVoltsPostResponse422> Validation Error
     */
    SDK.prototype.wallets_send_volts_api_v5_wallets_send_volts_post = function (body) {
        return this.core.fetch('/api/v5/wallets/send-volts', 'post', body);
    };
    /**
     * Get policy by id
     *
     * @summary Get policy by id
     * @throws FetchError<422, types.PoliciesGetPolicyByIdApiV5PoliciesPolicyIdGetResponse422> Validation Error
     */
    SDK.prototype.policies_get_policy_by_id_api_v5_policies__policy_id__get = function (metadata) {
        return this.core.fetch('/api/v5/policies/{policy_id}', 'get', metadata);
    };
    /**
     * Get policies
     *
     * @summary Get policies
     */
    SDK.prototype.policies_get_policies_api_v5_policies__get = function () {
        return this.core.fetch('/api/v5/policies/', 'get');
    };
    /**
     * Create device log.
     *
     * @summary Create device log
     * @throws FetchError<422, types.DeviceLogsCreateApiV5DeviceLogsPostResponse422> Validation Error
     */
    SDK.prototype.device_logs_create_api_v5_device_logs__post = function (body) {
        return this.core.fetch('/api/v5/device_logs/', 'post', body);
    };
    /**
     * Create Diagnostic log file.
     *
     * @summary Create diagnostic logs file
     * @throws FetchError<422, types.DiagnosticLogsCreateApiV5DiagnosticLogsPostResponse422> Validation Error
     */
    SDK.prototype.diagnostic_logs_create_api_v5_diagnostic_logs__post = function (body) {
        return this.core.fetch('/api/v5/diagnostic_logs/', 'post', body);
    };
    /**
     * Get latest firmware
     *
     * @summary Get latest firmware
     * @throws FetchError<422, types.FirmwaresLatestApiV5FirmwaresLatestGetResponse422> Validation Error
     */
    SDK.prototype.firmwares_latest_api_v5_firmwares_latest_get = function (metadata) {
        return this.core.fetch('/api/v5/firmwares/latest', 'get', metadata);
    };
    /**
     * Get the latest firmware for the given hardware version
     *
     * @summary Get the latest firmware for the given hardware version
     * @throws FetchError<422, types.FirmwaresLatestForHardwareApiV5FirmwaresLatestForHardwareGetResponse422> Validation Error
     */
    SDK.prototype.firmwares_latest_for_hardware_api_v5_firmwares_latest_for_hardware_get = function (metadata) {
        return this.core.fetch('/api/v5/firmwares/latest-for-hardware', 'get', metadata);
    };
    /**
     * Get user's devices
     *
     * @summary Get user's devices
     */
    SDK.prototype.user_devices_get_list_api_v5_user_devices__get = function () {
        return this.core.fetch('/api/v5/user-devices/', 'get');
    };
    /**
     * Upsert user device.
     *
     * @summary Upsert user device
     * @throws FetchError<422, types.UserDevicesUpsertApiV5UserDevicesPostResponse422> Validation Error
     */
    SDK.prototype.user_devices_upsert_api_v5_user_devices__post = function (body) {
        return this.core.fetch('/api/v5/user-devices/', 'post', body);
    };
    /**
     * Get all user's flags
     *
     * @summary Get all user's flags
     */
    SDK.prototype.user_flags_read_api_v5_user_flags__get = function () {
        return this.core.fetch('/api/v5/user-flags/', 'get');
    };
    /**
     * Create user flag
     *
     * @summary Create user flag
     * @throws FetchError<422, types.UserFlagsCreateApiV5UserFlagsPostResponse422> Validation Error
     */
    SDK.prototype.user_flags_create_api_v5_user_flags__post = function (body) {
        return this.core.fetch('/api/v5/user-flags/', 'post', body);
    };
    /**
     * Delete user flag
     *
     * @summary Delete user flag
     * @throws FetchError<422, types.UserFlagsDeleteApiV5UserFlagsDeleteResponse422> Validation Error
     */
    SDK.prototype.user_flags_delete_api_v5_user_flags__delete = function (metadata) {
        return this.core.fetch('/api/v5/user-flags/', 'delete', metadata);
    };
    /**
     * Get live and not expired banners of the specified app that the actual user can see (His
     * specific banners + banners that are not specific to any user + included in the audience
     *
     * @summary Get banners
     * @throws FetchError<422, types.BannersGetBannersApiV5BannersGetResponse422> Validation Error
     */
    SDK.prototype.banners_get_banners_api_v5_banners__get = function (metadata) {
        return this.core.fetch('/api/v5/banners/', 'get', metadata);
    };
    /**
     * Hide banner by id
     *
     * @summary Hide banner
     * @throws FetchError<422, types.BannersHideBannerApiV5BannersBannerIdHidePutResponse422> Validation Error
     */
    SDK.prototype.banners_hide_banner_api_v5_banners__banner_id__hide_put = function (metadata) {
        return this.core.fetch('/api/v5/banners/{banner_id}/hide', 'put', metadata);
    };
    /**
     * Get list of steps count for the given time interval
     *
     * @summary Get list of steps count
     * @throws FetchError<422, types.StepsCountsReadApiV5StepsCountsGetResponse422> Validation Error
     */
    SDK.prototype.steps_counts_read_api_v5_steps_counts__get = function (metadata) {
        return this.core.fetch('/api/v5/steps-counts/', 'get', metadata);
    };
    /**
     * Create steps count
     *
     * @summary Create steps count
     * @throws FetchError<422, types.StepsCountsCreateApiV5StepsCountsPostResponse422> Validation Error
     */
    SDK.prototype.steps_counts_create_api_v5_steps_counts__post = function (body) {
        return this.core.fetch('/api/v5/steps-counts/', 'post', body);
    };
    /**
     * Send a friendship request
     *
     * @summary Send a friendship request
     * @throws FetchError<422, types.FriendshipsSendRequestApiV5FriendshipsPostResponse422> Validation Error
     */
    SDK.prototype.friendships_send_request_api_v5_friendships__post = function (body) {
        return this.core.fetch('/api/v5/friendships/', 'post', body);
    };
    /**
     * Get current user sent friendship requests
     *
     * @summary Get current user sent friendship requests
     */
    SDK.prototype.friendships_sent_requests_api_v5_friendships_sent_requests_get = function () {
        return this.core.fetch('/api/v5/friendships/sent-requests', 'get');
    };
    /**
     * Get current user blocked friendship requests
     *
     * @summary Get blocked friendship requests
     */
    SDK.prototype.friendships_blocked_requests_api_v5_friendships_blocked_requests_get = function () {
        return this.core.fetch('/api/v5/friendships/blocked-requests', 'get');
    };
    /**
     * Get current user received friendship requests
     *
     * @summary Get received friendship requests
     */
    SDK.prototype.friendships_received_requests_api_v5_friendships_received_requests_get = function () {
        return this.core.fetch('/api/v5/friendships/received-requests', 'get');
    };
    /**
     * Accept a friendship request
     *
     * @summary Accept a friendship request
     * @throws FetchError<422, types.FriendshipsAcceptRequestApiV5FriendshipsAcceptRequestPutResponse422> Validation Error
     */
    SDK.prototype.friendships_accept_request_api_v5_friendships_accept_request_put = function (body) {
        return this.core.fetch('/api/v5/friendships/accept-request', 'put', body);
    };
    /**
     * Reject friendship request
     *
     * @summary Reject friendship request
     * @throws FetchError<422, types.FriendshipsRejectRequestApiV5FriendshipsRejectRequestPutResponse422> Validation Error
     */
    SDK.prototype.friendships_reject_request_api_v5_friendships_reject_request_put = function (body) {
        return this.core.fetch('/api/v5/friendships/reject-request', 'put', body);
    };
    /**
     * Cancel friendship request
     *
     * @summary Cancel friendship request
     * @throws FetchError<422, types.FriendshipsCancelRequestApiV5FriendshipsCancelRequestPutResponse422> Validation Error
     */
    SDK.prototype.friendships_cancel_request_api_v5_friendships_cancel_request_put = function (body) {
        return this.core.fetch('/api/v5/friendships/cancel-request', 'put', body);
    };
    /**
     * Block friendship request
     *
     * @summary Block friendship request
     * @throws FetchError<422, types.FriendshipsBlockRequestApiV5FriendshipsBlockRequestPutResponse422> Validation Error
     */
    SDK.prototype.friendships_block_request_api_v5_friendships_block_request_put = function (body) {
        return this.core.fetch('/api/v5/friendships/block-request', 'put', body);
    };
    /**
     * Unblock received friendship request
     *
     * @summary Unblock received friendship request
     * @throws FetchError<422, types.FriendshipsUnblockRequestApiV5FriendshipsUnblockRequestPutResponse422> Validation Error
     */
    SDK.prototype.friendships_unblock_request_api_v5_friendships_unblock_request_put = function (body) {
        return this.core.fetch('/api/v5/friendships/unblock-request', 'put', body);
    };
    /**
     * Remove friend
     *
     * @summary Remove friend
     * @throws FetchError<422, types.FriendshipsRemoveFriendApiV5FriendshipsRemoveFriendPutResponse422> Validation Error
     */
    SDK.prototype.friendships_remove_friend_api_v5_friendships_remove_friend_put = function (body) {
        return this.core.fetch('/api/v5/friendships/remove-friend', 'put', body);
    };
    /**
     * Get current user friends
     *
     * @summary Get friends
     */
    SDK.prototype.friendships_get_friends_api_v5_friendships_get_friends_get = function () {
        return this.core.fetch('/api/v5/friendships/get-friends', 'get');
    };
    /**
     * Get current user friend by friend_id
     *
     * @summary Get friend by friend_id
     * @throws FetchError<422, types.FriendshipsGetFriendshipApiV5FriendshipsGetFriendshipGetResponse422> Validation Error
     */
    SDK.prototype.friendships_get_friendship_api_v5_friendships_get_friendship_get = function (body) {
        return this.core.fetch('/api/v5/friendships/get-friendship', 'get', body);
    };
    /**
     * Get all badges
     *
     * @summary Get all badges
     */
    SDK.prototype.badges_get_all_api_v5_badges__get = function () {
        return this.core.fetch('/api/v5/badges/', 'get');
    };
    /**
     * Get badge by id
     *
     * @summary Get badge by id
     * @throws FetchError<422, types.BadgesGetByIdApiV5BadgesGetOneBadgeIdGetResponse422> Validation Error
     */
    SDK.prototype.badges_get_by_id_api_v5_badges_get_one__badge_id__get = function (metadata) {
        return this.core.fetch('/api/v5/badges/get-one/{badge_id}', 'get', metadata);
    };
    /**
     * Get user badges
     *
     * @summary Get user badges
     */
    SDK.prototype.badges_get_user_badges_api_v5_badges_get_user_badges_get = function () {
        return this.core.fetch('/api/v5/badges/get-user-badges', 'get');
    };
    /**
     * Get user badge
     *
     * @summary Get user badge
     * @throws FetchError<422, types.BadgesGetUserBadgeApiV5BadgesGetUserBadgeBadgeIdGetResponse422> Validation Error
     */
    SDK.prototype.badges_get_user_badge_api_v5_badges_get_user_badge__badge_id__get = function (metadata) {
        return this.core.fetch('/api/v5/badges/get-user-badge/{badge_id}', 'get', metadata);
    };
    /**
     * Add badge to user
     *
     * @summary Add badge to user
     * @throws FetchError<422, types.BadgesAddUserBadgeApiV5BadgesAddUserBadgePostResponse422> Validation Error
     */
    SDK.prototype.badges_add_user_badge_api_v5_badges_add_user_badge_post = function (body) {
        return this.core.fetch('/api/v5/badges/add-user-badge', 'post', body);
    };
    /**
     * Send poke
     *
     * @summary Send poke
     * @throws FetchError<422, types.PokePermissionsSendPokeApiV5PokesSendUserFriendIdPostResponse422> Validation Error
     */
    SDK.prototype.poke_permissions_send_poke_api_v5_pokes_send_user__friend_id__post = function (body, metadata) {
        return this.core.fetch('/api/v5/pokes/send/user/{friend_id}', 'post', body, metadata);
    };
    /**
     * Get user poke permissions given by current user
     *
     * @summary Poke-Permissions:Get-User-Poke-Permissions
     */
    SDK.prototype.poke_permissions_get_user_poke_permissions_api_v5_poke_permissions__get = function () {
        return this.core.fetch('/api/v5/poke-permissions/', 'get');
    };
    /**
     * Give a user a poke permission
     *
     * @summary Give a user poke permissions
     * @throws FetchError<422, types.PokePermissionsCreatePokePermissionApiV5PokePermissionsPostResponse422> Validation Error
     */
    SDK.prototype.poke_permissions_create_poke_permission_api_v5_poke_permissions__post = function (body) {
        return this.core.fetch('/api/v5/poke-permissions/', 'post', body);
    };
    /**
     * Get poke permissions by id for current user
     *
     * @summary Poke-Permissions:Get-Poke-Permission-By-Id
     * @throws FetchError<422, types.PokePermissionsGetPokePermissionByIdApiV5PokePermissionsPokePermissionIdGetResponse422> Validation Error
     */
    SDK.prototype.poke_permissions_get_poke_permission_by_id_api_v5_poke_permissions__poke_permission_id__get = function (metadata) {
        return this.core.fetch('/api/v5/poke-permissions/{poke_permission_id}', 'get', metadata);
    };
    /**
     * Update a poke permission
     *
     * @summary Update a poke permission
     * @throws FetchError<422, types.PokePermissionsUpdatePokePermissionApiV5PokePermissionsPokePermissionIdPutResponse422> Validation Error
     */
    SDK.prototype.poke_permissions_update_poke_permission_api_v5_poke_permissions__poke_permission_id__put = function (body, metadata) {
        return this.core.fetch('/api/v5/poke-permissions/{poke_permission_id}', 'put', body, metadata);
    };
    /**
     * Delete a poke permission
     *
     * @summary Poke-Permissions:Delete-Poke-Permission
     * @throws FetchError<422, types.PokePermissionsDeletePokePermissionApiV5PokePermissionsPokePermissionIdDeleteResponse422> Validation Error
     */
    SDK.prototype.poke_permissions_delete_poke_permission_api_v5_poke_permissions__poke_permission_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/poke-permissions/{poke_permission_id}', 'delete', metadata);
    };
    /**
     * Get poke permissions that was given to current user
     *
     * @summary Poke-Permissions:Get-Received-Poke-Permissions
     */
    SDK.prototype.poke_permissions_get_received_poke_permissions_api_v5_poke_permissions_received_get = function () {
        return this.core.fetch('/api/v5/poke-permissions/received', 'get');
    };
    /**
     * Get poke permission between current user and another user
     *
     * @summary Poke-Permissions:Get-Poke-Permission-By-Friend-Id
     * @throws FetchError<422, types.PokePermissionsGetPokePermissionByFriendIdApiV5PokePermissionsFriendFriendIdGetResponse422> Validation Error
     */
    SDK.prototype.poke_permissions_get_poke_permission_by_friend_id_api_v5_poke_permissions_friend__friend_id__get = function (metadata) {
        return this.core.fetch('/api/v5/poke-permissions/friend/{friend_id}', 'get', metadata);
    };
    /**
     * Get in app subscription route
     *
     * @summary Get active in app subscriptions
     */
    SDK.prototype.in_app_subscription_get_active_subscriptions_api_v5_InApp_Subscriptions__get = function () {
        return this.core.fetch('/api/v5/InApp Subscriptions/', 'get');
    };
    /**
     * Create in app subscriptions
     *
     * @throws FetchError<422, types.InAppSubscriptionAppStoreCreateApiV5InAppSubscriptionsAppStorePostResponse422> Validation Error
     */
    SDK.prototype.in_app_subscription_app_store_create_api_v5_InApp_Subscriptions_app_store_post = function (body) {
        return this.core.fetch('/api/v5/InApp Subscriptions/app-store', 'post', body);
    };
    /**
     * Get play store in app subscriptions
     *
     * @throws FetchError<422, types.InAppSubscriptionPlayStoreCreateApiV5InAppSubscriptionsPlayStorePostResponse422> Validation Error
     */
    SDK.prototype.in_app_subscription_play_store_create_api_v5_InApp_Subscriptions_play_store_post = function (body) {
        return this.core.fetch('/api/v5/InApp Subscriptions/play-store', 'post', body);
    };
    /**
     * Add stripe subscription to in app subscriptions
     *
     * @summary Create play sotre in app subscription
     * @throws FetchError<422, types.InAppSubscriptionStripeAddApiV5InAppSubscriptionsStripePostResponse422> Validation Error
     */
    SDK.prototype.in_app_subscription_stripe_add_api_v5_InApp_Subscriptions_stripe_post = function (body) {
        return this.core.fetch('/api/v5/InApp Subscriptions/stripe', 'post', body);
    };
    /**
     * Cron job to check the subscription
     *
     * @summary Verify all stripe subscriptions
     */
    SDK.prototype.in_app_subscription_stripe_verify_all_api_v5_InApp_Subscriptions_stripe_verify_subscriptions_get = function () {
        return this.core.fetch('/api/v5/InApp Subscriptions/stripe/verify-subscriptions', 'get');
    };
    /**
     * Get stripe subscription by id
     *
     * @summary Get stripe subscription by id
     * @throws FetchError<422, types.InAppSubscriptionStripeGetByIdApiV5InAppSubscriptionsStripeSubscriptionIdGetResponse422> Validation Error
     */
    SDK.prototype.in_app_subscription_stripe_get_by_id_api_v5_InApp_Subscriptions_stripe__subscription_id__get = function (metadata) {
        return this.core.fetch('/api/v5/InApp Subscriptions/stripe/{subscription_id}', 'get', metadata);
    };
    /**
     * Get in app subscription groups route
     *
     * @summary Get all subscriptions groups
     */
    SDK.prototype.in_app_subscriptions_groups_get_all_api_v5_InApp_Subscriptions_groups__get = function () {
        return this.core.fetch('/api/v5/InApp Subscriptions/groups/', 'get');
    };
    /**
     * Get in app subscription groups route
     *
     * @summary Get subscription group by name
     * @throws FetchError<422, types.InAppSubscriptionsGroupsGetByNameApiV5InAppSubscriptionsGroupsGroupNameGetResponse422> Validation Error
     */
    SDK.prototype.in_app_subscriptions_groups_get_by_name_api_v5_InApp_Subscriptions_groups__group_name__get = function (metadata) {
        return this.core.fetch('/api/v5/InApp Subscriptions/groups/{group_name}', 'get', metadata);
    };
    /**
     * Get all the alarms of the current user
     *
     * @summary Get all the alarms of the current user
     */
    SDK.prototype.alarms_get_all_api_v5_alarms__get = function () {
        return this.core.fetch('/api/v5/alarms/', 'get');
    };
    /**
     * Create Alarm
     *
     * @summary Create an alarm
     * @throws FetchError<422, types.AlarmsCreateApiV5AlarmsPostResponse422> Validation Error
     */
    SDK.prototype.alarms_create_api_v5_alarms__post = function (body) {
        return this.core.fetch('/api/v5/alarms/', 'post', body);
    };
    /**
     * Get one alarm by id
     *
     * @summary Get one alarm by id
     * @throws FetchError<422, types.AlarmsGetOneApiV5AlarmsAlarmIdGetResponse422> Validation Error
     */
    SDK.prototype.alarms_get_one_api_v5_alarms__alarm_id__get = function (metadata) {
        return this.core.fetch('/api/v5/alarms/{alarm_id}', 'get', metadata);
    };
    /**
     * Update Alarm
     *
     * @summary Update an alarm
     * @throws FetchError<422, types.AlarmsUpdateApiV5AlarmsAlarmIdPutResponse422> Validation Error
     */
    SDK.prototype.alarms_update_api_v5_alarms__alarm_id__put = function (body, metadata) {
        return this.core.fetch('/api/v5/alarms/{alarm_id}', 'put', body, metadata);
    };
    /**
     * Delete Alarm
     *
     * @summary Delete an alarm by id
     * @throws FetchError<422, types.AlarmsDeleteApiV5AlarmsAlarmIdDeleteResponse422> Validation Error
     */
    SDK.prototype.alarms_delete_api_v5_alarms__alarm_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/alarms/{alarm_id}', 'delete', metadata);
    };
    /**
     * Get battery issues
     *
     * @summary Get battery issues
     * @throws FetchError<422, types.BatteryIssuesGetBatteryIssuesApiV5BatteryIssuesGetResponse422> Validation Error
     */
    SDK.prototype.battery_issues_get_battery_issues_api_v5_battery_issues__get = function (metadata) {
        return this.core.fetch('/api/v5/battery-issues/', 'get', metadata);
    };
    /**
     * Get database healtcheck
     *
     * @summary Database healthcheck
     */
    SDK.prototype.healtcheck_status_api_v5_healtcheck__get = function () {
        return this.core.fetch('/api/v5/healtcheck/', 'get');
    };
    /**
     * Stripe webhook
     *
     * @summary Stripe webhook
     * @throws FetchError<422, types.StripeWebhookApiV5StripeWebhookPostResponse422> Validation Error
     */
    SDK.prototype.stripe_webhook_api_v5_stripe_webhook_post = function (metadata) {
        return this.core.fetch('/api/v5/stripe/webhook', 'post', metadata);
    };
    /**
     * Readme auth webhook
     *
     * @summary Readme auth webhook
     */
    SDK.prototype.readme_webhook_api_v5_readme_webhook_post = function () {
        return this.core.fetch('/api/v5/readme/webhook', 'post');
    };
    /**
     * Revenue cat webhook
     *
     * @summary Revenue cat webhook
     */
    SDK.prototype.revenue_cat_webhook_api_v5_revenue_cat__post = function () {
        return this.core.fetch('/api/v5/revenue-cat/', 'post');
    };
    /**
     * Get all threads
     *
     * @summary Get all chat threads
     */
    SDK.prototype.ai_chat_threads_get_all_api_v5_ai_chat_threads__get = function () {
        return this.core.fetch('/api/v5/ai-chat/threads/', 'get');
    };
    /**
     * Create a chat thread
     *
     * @throws FetchError<422, types.AiChatThreadsCreateApiV5AiChatThreadsPostResponse422> Validation Error
     */
    SDK.prototype.ai_chat_threads_create_api_v5_ai_chat_threads__post = function (body) {
        return this.core.fetch('/api/v5/ai-chat/threads/', 'post', body);
    };
    /**
     * Get a single chat thread
     *
     * @throws FetchError<422, types.AiChatThreadsGetOneApiV5AiChatThreadsThreadIdGetResponse422> Validation Error
     */
    SDK.prototype.ai_chat_threads_get_one_api_v5_ai_chat_threads__thread_id__get = function (metadata) {
        return this.core.fetch('/api/v5/ai-chat/threads/{thread_id}', 'get', metadata);
    };
    /**
     * Update a chat thread
     *
     * @throws FetchError<422, types.AiChatThreadsUpdateApiV5AiChatThreadsThreadIdPutResponse422> Validation Error
     */
    SDK.prototype.ai_chat_threads_update_api_v5_ai_chat_threads__thread_id__put = function (body, metadata) {
        return this.core.fetch('/api/v5/ai-chat/threads/{thread_id}', 'put', body, metadata);
    };
    /**
     * Delete a chat thread
     *
     * @throws FetchError<422, types.AiChatThreadsDeleteApiV5AiChatThreadsThreadIdDeleteResponse422> Validation Error
     */
    SDK.prototype.ai_chat_threads_delete_api_v5_ai_chat_threads__thread_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/ai-chat/threads/{thread_id}', 'delete', metadata);
    };
    /**
     * Get all messages within a specific thread.
     *
     * @summary Get all chat messages in a thread
     * @throws FetchError<422, types.AiChatMessagesGetAllApiV5AiChatMessagesGetResponse422> Validation Error
     */
    SDK.prototype.ai_chat_messages_get_all_api_v5_ai_chat_messages__get = function (metadata) {
        return this.core.fetch('/api/v5/ai-chat/messages/', 'get', metadata);
    };
    /**
     * Create a new message in a specific thread.
     *
     * @summary Create a new chat message in a thread
     * @throws FetchError<422, types.AiChatMessagesCreateApiV5AiChatMessagesPostResponse422> Validation Error
     */
    SDK.prototype.ai_chat_messages_create_api_v5_ai_chat_messages__post = function (body) {
        return this.core.fetch('/api/v5/ai-chat/messages/', 'post', body);
    };
    /**
     * Delete a specific chat message.
     *
     * @summary Delete a chat message
     * @throws FetchError<422, types.AiChatMessagesDeleteApiV5AiChatMessagesMessageIdDeleteResponse422> Validation Error
     */
    SDK.prototype.ai_chat_messages_delete_api_v5_ai_chat_messages__message_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/ai-chat/messages/{message_id}', 'delete', metadata);
    };
    /**
     * Create a new message in a specific thread.
     *
     * @summary Get text from audio
     * @throws FetchError<422, types.AiChatMessagesAudioApiV5AiChatMessagesAudioPostResponse422> Validation Error
     */
    SDK.prototype.ai_chat_messages_audio_api_v5_ai_chat_messages_audio_post = function (body, metadata) {
        return this.core.fetch('/api/v5/ai-chat/messages/audio', 'post', body, metadata);
    };
    /**
     * Create a new chat message in a thread
     *
     * @throws FetchError<422, types.AiChatMessagesFeedbacksCreateApiV5AiChatFeedbacksPostResponse422> Validation Error
     */
    SDK.prototype.ai_chat_messages_feedbacks_create_api_v5_ai_chat_feedbacks__post = function (body) {
        return this.core.fetch('/api/v5/ai-chat/feedbacks/', 'post', body);
    };
    /**
     * endpoint to be called by the load balancer for healthcheck
     *
     * @summary Healthcheck
     */
    SDK.prototype.healthcheck_api_v5_health__get = function () {
        return this.core.fetch('/api/v5/health/', 'get');
    };
    /**
     * Get measurement logs for the specified measurement key and date interval
     *
     * @summary Get measurement logs
     * @throws FetchError<422, types.MeasurementsLogsGetAllApiV5MeasurementsLogsGetResponse422> Validation Error
     */
    SDK.prototype.measurements_logs_get_all_api_v5_measurements_logs__get = function (metadata) {
        return this.core.fetch('/api/v5/measurements-logs/', 'get', metadata);
    };
    /**
     * Create multiple measurement logs
     *
     * @summary Create multiple measurement logs
     * @throws FetchError<422, types.MeasurementsLogsCreateMultipleApiV5MeasurementsLogsPostResponse422> Validation Error
     */
    SDK.prototype.measurements_logs_create_multiple_api_v5_measurements_logs__post = function (body) {
        return this.core.fetch('/api/v5/measurements-logs/', 'post', body);
    };
    /**
     * Update measurement log
     *
     * @summary Update measurement log
     * @throws FetchError<422, types.MeasurementsLogsUpdateApiV5MeasurementsLogsMeasurementLogIdPutResponse422> Validation Error
     */
    SDK.prototype.measurements_logs_update_api_v5_measurements_logs__measurement_log_id__put = function (body, metadata) {
        return this.core.fetch('/api/v5/measurements-logs/{measurement_log_id}', 'put', body, metadata);
    };
    /**
     * Create multiple measurement logs
     *
     * @summary Create multiple measurement logs
     * @throws FetchError<422, types.MeasurementsLogsDeleteApiV5MeasurementsLogsMeasurementLogIdDeleteResponse422> Validation Error
     */
    SDK.prototype.measurements_logs_delete_api_v5_measurements_logs__measurement_log_id__delete = function (metadata) {
        return this.core.fetch('/api/v5/measurements-logs/{measurement_log_id}', 'delete', metadata);
    };
    /**
     * Get Not Found Page
     *
     */
    SDK.prototype.get_not_found_page_404_get = function () {
        return this.core.fetch('/404', 'get');
    };
    /**
     * Get Internal Server Error Page
     *
     */
    SDK.prototype.get_internal_server_error_page_500_get = function () {
        return this.core.fetch('/500', 'get');
    };
    /**
     * Get Open Api Endpoint
     *
     */
    SDK.prototype.get_open_api_endpoint_api_v5_secure_openapi_json_get = function () {
        return this.core.fetch('/api/v5/secure/openapi.json', 'get');
    };
    /**
     * Get Documentation
     *
     */
    SDK.prototype.get_documentation_api_v5_secure_docs_get = function () {
        return this.core.fetch('/api/v5/secure/docs', 'get');
    };
    /**
     * Get Apple App Site Association
     *
     */
    SDK.prototype.get_apple_app_site_association__well_known_apple_app_site_association_get = function () {
        return this.core.fetch('/.well-known/apple-app-site-association', 'get');
    };
    /**
     * Get Assetslinks For Android
     *
     */
    SDK.prototype.get_assetslinks_for_android__well_known_assetlinks_json_get = function () {
        return this.core.fetch('/.well-known/assetlinks.json', 'get');
    };
    /**
     * Get Home Page
     *
     */
    SDK.prototype.get_home_page_home_get = function () {
        return this.core.fetch('/home', 'get');
    };
    /**
     * Get Readme Docs
     *
     */
    SDK.prototype.get_readme_docs_docs_get = function () {
        return this.core.fetch('/docs', 'get');
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
