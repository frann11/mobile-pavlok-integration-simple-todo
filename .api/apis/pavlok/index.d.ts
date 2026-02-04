import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
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
    auth(...values: string[] | number[]): this;
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
    server(url: string, variables?: {}): void;
    /**
     * Home:Index
     *
     */
    home_index_api_v5__get(): Promise<FetchResponse<200, types.HomeIndexApiV5GetResponse200>>;
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
    analytics_admin_bulk_sync_api_v5_admin_analytics_bulk_sync_post(body: types.AnalyticsAdminBulkSyncApiV5AdminAnalyticsBulkSyncPostBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get historical engagement rate data. An engaged user is a user who has used his device
     * at least once in the last week, and at least once 4 weeks ago.row
     *
     * @summary Get historical engagement rate data
     */
    analytics_admin_engagement_rate_api_v5_admin_analytics_engagement_rate_get(): Promise<FetchResponse<200, types.AnalyticsAdminEngagementRateApiV5AdminAnalyticsEngagementRateGetResponse200>>;
    /**
     * Get firmware usage rate by firmware version
     *
     * @summary Get firmware usage rate by firmware version
     */
    analytics_admin_firmware_adoption_api_v5_admin_analytics_firmware_adoption_get(): Promise<FetchResponse<200, types.AnalyticsAdminFirmwareAdoptionApiV5AdminAnalyticsFirmwareAdoptionGetResponse200>>;
    /**
     * Get feature usage over weeks
     *
     * @summary Get feature usage over weeks
     * @throws FetchError<422, types.AnalyticsAdminFeaturesUsageApiV5AdminAnalyticsFeaturesUsageGetResponse422> Validation Error
     */
    analytics_admin_features_usage_api_v5_admin_analytics_features_usage_get(metadata?: types.AnalyticsAdminFeaturesUsageApiV5AdminAnalyticsFeaturesUsageGetMetadataParam): Promise<FetchResponse<200, types.AnalyticsAdminFeaturesUsageApiV5AdminAnalyticsFeaturesUsageGetResponse200>>;
    /**
     * Get reviews with their topics for the given date range.
     *
     * @summary Get reviews with their topics
     * @throws FetchError<422, types.AnalyticsAdminReviewsApiV5AdminAnalyticsReviewsGetResponse422> Validation Error
     */
    analytics_admin_reviews_api_v5_admin_analytics_reviews_get(metadata?: types.AnalyticsAdminReviewsApiV5AdminAnalyticsReviewsGetMetadataParam): Promise<FetchResponse<200, types.AnalyticsAdminReviewsApiV5AdminAnalyticsReviewsGetResponse200>>;
    /**
     * Update the topics for a review given its id
     *
     * @summary Update the topics for a review
     * @throws FetchError<422, types.AnalyticsAdminReviewsUpdateApiV5AdminAnalyticsReviewsReviewIdPutResponse422> Validation Error
     */
    analytics_admin_reviews_update_api_v5_admin_analytics_reviews__review_id__put(body: types.AnalyticsAdminReviewsUpdateApiV5AdminAnalyticsReviewsReviewIdPutBodyParam, metadata: types.AnalyticsAdminReviewsUpdateApiV5AdminAnalyticsReviewsReviewIdPutMetadataParam): Promise<FetchResponse<200, types.AnalyticsAdminReviewsUpdateApiV5AdminAnalyticsReviewsReviewIdPutResponse200>>;
    /**
     * Get cumulative ratings along with averages across all platforms for a given date range
     *
     * @summary Get ratings across all platforms
     * @throws FetchError<422, types.AnalyticsAdminRatingsApiV5AdminAnalyticsRatingsGetResponse422> Validation Error
     */
    analytics_admin_ratings_api_v5_admin_analytics_ratings_get(metadata: types.AnalyticsAdminRatingsApiV5AdminAnalyticsRatingsGetMetadataParam): Promise<FetchResponse<200, types.AnalyticsAdminRatingsApiV5AdminAnalyticsRatingsGetResponse200>>;
    /**
     * Route used to test the ai_chat_starter_service
     *
     * @throws FetchError<422, types.AiChatMessagesAdminCreateNonStreamApiV5AdminAiChatMessagesStartConvoPostResponse422> Validation Error
     */
    ai_chat_messages_admin_create_non_stream_api_v5_admin_ai_chat_messages_start_convo_post(body: types.AiChatMessagesAdminCreateNonStreamApiV5AdminAiChatMessagesStartConvoPostBodyParam): Promise<FetchResponse<201, types.AiChatMessagesAdminCreateNonStreamApiV5AdminAiChatMessagesStartConvoPostResponse201>>;
    /**
     * Create a new message in a specific thread.
     *
     * @summary Create a new chat message in a thread
     * @throws FetchError<422, types.AiChatMessagesAdminCreateApiV5AdminAiChatMessagesPostResponse422> Validation Error
     */
    ai_chat_messages_admin_create_api_v5_admin_ai_chat_messages_post(body: types.AiChatMessagesAdminCreateApiV5AdminAiChatMessagesPostBodyParam, metadata: types.AiChatMessagesAdminCreateApiV5AdminAiChatMessagesPostMetadataParam): Promise<FetchResponse<201, types.AiChatMessagesAdminCreateApiV5AdminAiChatMessagesPostResponse201>>;
    /**
     * Get all badges
     *
     * @summary Get all badges
     */
    badges_admin_get_all_api_v5_admin_badges__get(): Promise<FetchResponse<200, types.BadgesAdminGetAllApiV5AdminBadgesGetResponse200>>;
    /**
     * Create badge
     *
     * @summary Create badge
     * @throws FetchError<422, types.BadgesAdminCreateApiV5AdminBadgesPostResponse422> Validation Error
     */
    badges_admin_create_api_v5_admin_badges__post(body: types.BadgesAdminCreateApiV5AdminBadgesPostBodyParam): Promise<FetchResponse<201, types.BadgesAdminCreateApiV5AdminBadgesPostResponse201>>;
    /**
     * Get badge by id
     *
     * @summary Get badge by id
     * @throws FetchError<422, types.BadgesAdminGetByIdApiV5AdminBadgesGetOneBadgeIdGetResponse422> Validation Error
     */
    badges_admin_get_by_id_api_v5_admin_badges_get_one__badge_id__get(metadata: types.BadgesAdminGetByIdApiV5AdminBadgesGetOneBadgeIdGetMetadataParam): Promise<FetchResponse<200, types.BadgesAdminGetByIdApiV5AdminBadgesGetOneBadgeIdGetResponse200>>;
    /**
     * Update badge
     *
     * @summary Update badge
     * @throws FetchError<422, types.BadgesAdminUpdateApiV5AdminBadgesBadgeIdPutResponse422> Validation Error
     */
    badges_admin_update_api_v5_admin_badges__badge_id__put(body: types.BadgesAdminUpdateApiV5AdminBadgesBadgeIdPutBodyParam, metadata: types.BadgesAdminUpdateApiV5AdminBadgesBadgeIdPutMetadataParam): Promise<FetchResponse<200, types.BadgesAdminUpdateApiV5AdminBadgesBadgeIdPutResponse200>>;
    /**
     * Delete badge
     *
     * @summary Delete badge
     * @throws FetchError<422, types.BadgesAdminDeleteApiV5AdminBadgesBadgeIdDeleteResponse422> Validation Error
     */
    badges_admin_delete_api_v5_admin_badges__badge_id__delete(metadata: types.BadgesAdminDeleteApiV5AdminBadgesBadgeIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Add badge to user
     *
     * @summary Add badge to user
     * @throws FetchError<422, types.BadgesAdminAddUserBadgeApiV5AdminBadgesAddUserBadgePostResponse422> Validation Error
     */
    badges_admin_add_user_badge_api_v5_admin_badges_add_user_badge_post(body: types.BadgesAdminAddUserBadgeApiV5AdminBadgesAddUserBadgePostBodyParam): Promise<FetchResponse<201, types.BadgesAdminAddUserBadgeApiV5AdminBadgesAddUserBadgePostResponse201>>;
    /**
     * Get user badges
     *
     * @summary Get user badges
     * @throws FetchError<422, types.BadgesAdminGetUserBadgesApiV5AdminBadgesGetUserBadgesGetResponse422> Validation Error
     */
    badges_admin_get_user_badges_api_v5_admin_badges_get_user_badges_get(metadata: types.BadgesAdminGetUserBadgesApiV5AdminBadgesGetUserBadgesGetMetadataParam): Promise<FetchResponse<200, types.BadgesAdminGetUserBadgesApiV5AdminBadgesGetUserBadgesGetResponse200>>;
    /**
     * Get all banners for admin dashboard
     *
     * @summary Get all banners
     */
    banners_admin_get_all_api_v5_admin_banners_all_get(): Promise<FetchResponse<200, types.BannersAdminGetAllApiV5AdminBannersAllGetResponse200>>;
    /**
     * Get one banner details for admin dashboard
     *
     * @summary Get one banner details
     * @throws FetchError<422, types.BannersAdminGetOneApiV5AdminBannersBannerIdGetResponse422> Validation Error
     */
    banners_admin_get_one_api_v5_admin_banners__banner_id__get(metadata: types.BannersAdminGetOneApiV5AdminBannersBannerIdGetMetadataParam): Promise<FetchResponse<200, types.BannersAdminGetOneApiV5AdminBannersBannerIdGetResponse200>>;
    /**
     * Update banner for admin dashboard
     *
     * @summary Update banner
     * @throws FetchError<422, types.BannersAdminUpdateApiV5AdminBannersPutResponse422> Validation Error
     */
    banners_admin_update_api_v5_admin_banners__put(body: types.BannersAdminUpdateApiV5AdminBannersPutBodyParam): Promise<FetchResponse<200, types.BannersAdminUpdateApiV5AdminBannersPutResponse200>>;
    /**
     * Create banner for admin dashboard
     *
     * @summary Create banner
     * @throws FetchError<422, types.BannersAdminCreateApiV5AdminBannersPostResponse422> Validation Error
     */
    banners_admin_create_api_v5_admin_banners__post(body: types.BannersAdminCreateApiV5AdminBannersPostBodyParam): Promise<FetchResponse<201, types.BannersAdminCreateApiV5AdminBannersPostResponse201>>;
    /**
     * Delete banner for admin dashboard
     *
     * @summary Delete banner
     * @throws FetchError<422, types.BannersAdminDeleteApiV5AdminBannersDeleteResponse422> Validation Error
     */
    banners_admin_delete_api_v5_admin_banners__delete(metadata: types.BannersAdminDeleteApiV5AdminBannersDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get all challenges for admin dashboard
     *
     * @summary Get all challenges
     */
    challenges_admin_get_all_api_v5_admin_challenges__get(): Promise<FetchResponse<200, types.ChallengesAdminGetAllApiV5AdminChallengesGetResponse200>>;
    /**
     * Update challenge for admin dashboard
     *
     * @summary Update challenge
     * @throws FetchError<422, types.ChallengesAdminUpdateApiV5AdminChallengesPutResponse422> Validation Error
     */
    challenges_admin_update_api_v5_admin_challenges__put(body: types.ChallengesAdminUpdateApiV5AdminChallengesPutBodyParam): Promise<FetchResponse<200, types.ChallengesAdminUpdateApiV5AdminChallengesPutResponse200>>;
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
    challenges_admin_create_api_v5_admin_challenges__post(body: types.ChallengesAdminCreateApiV5AdminChallengesPostBodyParam): Promise<FetchResponse<201, types.ChallengesAdminCreateApiV5AdminChallengesPostResponse201>>;
    /**
     * Delete challenge for admin dashboard
     *
     * @summary Delete challenge
     * @throws FetchError<422, types.ChallengesAdminDeleteApiV5AdminChallengesDeleteResponse422> Validation Error
     */
    challenges_admin_delete_api_v5_admin_challenges__delete(metadata: types.ChallengesAdminDeleteApiV5AdminChallengesDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get a challenge for admin dashboard
     *
     * @summary Get a challenge
     * @throws FetchError<422, types.ChallengesAdminGetOneApiV5AdminChallengesChallengeIdGetResponse422> Validation Error
     */
    challenges_admin_get_one_api_v5_admin_challenges__challenge_id__get(metadata: types.ChallengesAdminGetOneApiV5AdminChallengesChallengeIdGetMetadataParam): Promise<FetchResponse<200, types.ChallengesAdminGetOneApiV5AdminChallengesChallengeIdGetResponse200>>;
    /**
     * Get all contents
     *
     */
    contents_admin_get_all_api_v5_admin_contents__get(): Promise<FetchResponse<200, types.ContentsAdminGetAllApiV5AdminContentsGetResponse200>>;
    /**
     * Create content
     *
     * @throws FetchError<422, types.ContentsAdminCreateApiV5AdminContentsPostResponse422> Validation Error
     */
    contents_admin_create_api_v5_admin_contents__post(body: types.ContentsAdminCreateApiV5AdminContentsPostBodyParam): Promise<FetchResponse<201, types.ContentsAdminCreateApiV5AdminContentsPostResponse201>>;
    /**
     * Get one content
     *
     * @throws FetchError<422, types.ContentsAdminGetByIdApiV5AdminContentsContentIdGetResponse422> Validation Error
     */
    contents_admin_get_by_id_api_v5_admin_contents__content_id__get(metadata: types.ContentsAdminGetByIdApiV5AdminContentsContentIdGetMetadataParam): Promise<FetchResponse<200, types.ContentsAdminGetByIdApiV5AdminContentsContentIdGetResponse200>>;
    /**
     * Update content
     *
     * @throws FetchError<422, types.ContentsAdminUpdateApiV5AdminContentsContentIdPutResponse422> Validation Error
     */
    contents_admin_update_api_v5_admin_contents__content_id__put(body: types.ContentsAdminUpdateApiV5AdminContentsContentIdPutBodyParam, metadata: types.ContentsAdminUpdateApiV5AdminContentsContentIdPutMetadataParam): Promise<FetchResponse<200, types.ContentsAdminUpdateApiV5AdminContentsContentIdPutResponse200>>;
    /**
     * Delete content
     *
     * @throws FetchError<422, types.ContentsAdminDeleteApiV5AdminContentsContentIdDeleteResponse422> Validation Error
     */
    contents_admin_delete_api_v5_admin_contents__content_id__delete(metadata: types.ContentsAdminDeleteApiV5AdminContentsContentIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Create multiple contents from CSV
     *
     * @throws FetchError<422, types.ContentsAdminBulkCreateApiV5AdminContentsBulkPostResponse422> Validation Error
     */
    contents_admin_bulk_create_api_v5_admin_contents_bulk_post(body: types.ContentsAdminBulkCreateApiV5AdminContentsBulkPostBodyParam): Promise<FetchResponse<201, types.ContentsAdminBulkCreateApiV5AdminContentsBulkPostResponse201>>;
    /**
     * Get all content categories
     *
     */
    contents_categories_admin_get_all_api_v5_admin_content_categories__get(): Promise<FetchResponse<200, types.ContentsCategoriesAdminGetAllApiV5AdminContentCategoriesGetResponse200>>;
    /**
     * Create content category
     *
     * @throws FetchError<422, types.ContentsCategoriesAdminCreateApiV5AdminContentCategoriesPostResponse422> Validation Error
     */
    contents_categories_admin_create_api_v5_admin_content_categories__post(body: types.ContentsCategoriesAdminCreateApiV5AdminContentCategoriesPostBodyParam): Promise<FetchResponse<201, types.ContentsCategoriesAdminCreateApiV5AdminContentCategoriesPostResponse201>>;
    /**
     * Get one content category
     *
     * @throws FetchError<422, types.ContentsCategoriesAdminGetOneApiV5AdminContentCategoriesContentsCategoryIdGetResponse422> Validation Error
     */
    contents_categories_admin_get_one_api_v5_admin_content_categories__contents_category_id__get(metadata: types.ContentsCategoriesAdminGetOneApiV5AdminContentCategoriesContentsCategoryIdGetMetadataParam): Promise<FetchResponse<200, types.ContentsCategoriesAdminGetOneApiV5AdminContentCategoriesContentsCategoryIdGetResponse200>>;
    /**
     * Update content category
     *
     * @throws FetchError<422, types.ContentsCategoriesAdminUpdateApiV5AdminContentCategoriesContentsCategoryIdPutResponse422> Validation Error
     */
    contents_categories_admin_update_api_v5_admin_content_categories__contents_category_id__put(body: types.ContentsCategoriesAdminUpdateApiV5AdminContentCategoriesContentsCategoryIdPutBodyParam, metadata: types.ContentsCategoriesAdminUpdateApiV5AdminContentCategoriesContentsCategoryIdPutMetadataParam): Promise<FetchResponse<200, types.ContentsCategoriesAdminUpdateApiV5AdminContentCategoriesContentsCategoryIdPutResponse200>>;
    /**
     * Delete content category
     *
     * @throws FetchError<422, types.ContentsCategoriesAdminDeleteApiV5AdminContentCategoriesContentsCategoryIdDeleteResponse422> Validation Error
     */
    contents_categories_admin_delete_api_v5_admin_content_categories__contents_category_id__delete(metadata: types.ContentsCategoriesAdminDeleteApiV5AdminContentCategoriesContentsCategoryIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get all challenges of the coach
     *
     * @summary Get all challenges of the coach
     * @throws FetchError<422, types.CoachingAdminGetChallengesByCoachApiV5AdminCoachingChallengesGetResponse422> Validation Error
     */
    coaching_admin_get_challenges_by_coach_api_v5_admin_coaching_challenges_get(metadata: types.CoachingAdminGetChallengesByCoachApiV5AdminCoachingChallengesGetMetadataParam): Promise<FetchResponse<200, types.CoachingAdminGetChallengesByCoachApiV5AdminCoachingChallengesGetResponse200>>;
    /**
     * Get all coaches for the specified challenge
     *
     * @summary Get all coaches for the specified challenge
     * @throws FetchError<422, types.CoachingAdminGetCoachesByChallengeApiV5AdminCoachingChallengeIdGetResponse422> Validation Error
     */
    coaching_admin_get_coaches_by_challenge_api_v5_admin_coaching__challenge_id__get(metadata: types.CoachingAdminGetCoachesByChallengeApiV5AdminCoachingChallengeIdGetMetadataParam): Promise<FetchResponse<200, types.CoachingAdminGetCoachesByChallengeApiV5AdminCoachingChallengeIdGetResponse200>>;
    /**
     * Add a list of coaches to the specified challenge
     *
     * @summary Add a list of coaches to the specified challenge
     * @throws FetchError<422, types.CoachingAdminAddCoachesToChallengeApiV5AdminCoachingChallengeIdPostResponse422> Validation Error
     */
    coaching_admin_add_coaches_to_challenge_api_v5_admin_coaching__challenge_id__post(body: types.CoachingAdminAddCoachesToChallengeApiV5AdminCoachingChallengeIdPostBodyParam, metadata: types.CoachingAdminAddCoachesToChallengeApiV5AdminCoachingChallengeIdPostMetadataParam): Promise<FetchResponse<201, types.CoachingAdminAddCoachesToChallengeApiV5AdminCoachingChallengeIdPostResponse201>>;
    /**
     * Delete a coach from the specified challenge
     *
     * @summary Delete a coach from the specified challenge
     * @throws FetchError<422, types.CoachingAdminDeleteCoachFromChallengeApiV5AdminCoachingChallengeIdDeleteResponse422> Validation Error
     */
    coaching_admin_delete_coach_from_challenge_api_v5_admin_coaching__challenge_id__delete(metadata: types.CoachingAdminDeleteCoachFromChallengeApiV5AdminCoachingChallengeIdDeleteMetadataParam): Promise<FetchResponse<201, types.CoachingAdminDeleteCoachFromChallengeApiV5AdminCoachingChallengeIdDeleteResponse201>>;
    /**
     * Get all firmwares
     *
     * @summary Get all firmwares
     */
    firmwares_admin_get_all_api_v5_admin_firmwares__get(): Promise<FetchResponse<200, types.FirmwaresAdminGetAllApiV5AdminFirmwaresGetResponse200>>;
    /**
     * Create firmware for admin dashboard
     *
     * @summary Create firmware
     * @throws FetchError<422, types.FirmwaresAdminCreateApiV5AdminFirmwaresPostResponse422> Validation Error
     */
    firmwares_admin_create_api_v5_admin_firmwares__post(body: types.FirmwaresAdminCreateApiV5AdminFirmwaresPostBodyParam): Promise<FetchResponse<201, types.FirmwaresAdminCreateApiV5AdminFirmwaresPostResponse201>>;
    /**
     * Delete firmware for admin dashboard
     *
     * @summary Delete firmware
     * @throws FetchError<422, types.FirmwaresAdminDeleteApiV5AdminFirmwaresDeleteResponse422> Validation Error
     */
    firmwares_admin_delete_api_v5_admin_firmwares__delete(metadata: types.FirmwaresAdminDeleteApiV5AdminFirmwaresDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get one firmware details for admin dashboard
     *
     * @summary Get one firmware details
     * @throws FetchError<422, types.FirmwaresAdminGetOneApiV5AdminFirmwaresFirmwareIdGetResponse422> Validation Error
     */
    firmwares_admin_get_one_api_v5_admin_firmwares__firmware_id__get(metadata: types.FirmwaresAdminGetOneApiV5AdminFirmwaresFirmwareIdGetMetadataParam): Promise<FetchResponse<200, types.FirmwaresAdminGetOneApiV5AdminFirmwaresFirmwareIdGetResponse200>>;
    /**
     * Update firmware for admin dashboard
     *
     * @summary Update firmware
     * @throws FetchError<422, types.FirmwaresAdminUpdateApiV5AdminFirmwaresFirmwareIdPutResponse422> Validation Error
     */
    firmwares_admin_update_api_v5_admin_firmwares__firmware_id__put(body: types.FirmwaresAdminUpdateApiV5AdminFirmwaresFirmwareIdPutBodyParam, metadata: types.FirmwaresAdminUpdateApiV5AdminFirmwaresFirmwareIdPutMetadataParam): Promise<FetchResponse<200, types.FirmwaresAdminUpdateApiV5AdminFirmwaresFirmwareIdPutResponse200>>;
    /**
     * Get all hardwares for admin dashboard
     *
     * @summary Get all hardwares
     */
    hardwares_admin_get_all_api_v5_admin_hardwares__get(): Promise<FetchResponse<200, types.HardwaresAdminGetAllApiV5AdminHardwaresGetResponse200>>;
    /**
     * Get current user friends
     *
     * @summary Get friends
     * @throws FetchError<422, types.FriendshipsAdminGetFriendsApiV5AdminFriendshipsGetFriendsGetResponse422> Validation Error
     */
    friendships_admin_get_friends_api_v5_admin_friendships_get_friends_get(metadata: types.FriendshipsAdminGetFriendsApiV5AdminFriendshipsGetFriendsGetMetadataParam): Promise<FetchResponse<200, types.FriendshipsAdminGetFriendsApiV5AdminFriendshipsGetFriendsGetResponse200>>;
    /**
     * Get all habits
     *
     * @summary Get all habits
     */
    habits_admin_get_all_api_v5_admin_habits__get(): Promise<FetchResponse<200, types.HabitsAdminGetAllApiV5AdminHabitsGetResponse200>>;
    /**
     * Update Habit
     *
     * @summary Update Habit
     * @throws FetchError<422, types.HabitsAdminUpdateApiV5AdminHabitsPutResponse422> Validation Error
     */
    habits_admin_update_api_v5_admin_habits__put(body: types.HabitsAdminUpdateApiV5AdminHabitsPutBodyParam): Promise<FetchResponse<200, types.HabitsAdminUpdateApiV5AdminHabitsPutResponse200>>;
    /**
     * Create Habit with questions and answers
     *
     * @summary Create Habit with questions and answers
     * @throws FetchError<422, types.HabitsAdminCreateApiV5AdminHabitsPostResponse422> Validation Error
     */
    habits_admin_create_api_v5_admin_habits__post(body: types.HabitsAdminCreateApiV5AdminHabitsPostBodyParam): Promise<FetchResponse<201, types.HabitsAdminCreateApiV5AdminHabitsPostResponse201>>;
    /**
     * Delete Habit
     *
     * @summary Delete Habit
     * @throws FetchError<422, types.HabitsAdminDeleteApiV5AdminHabitsDeleteResponse422> Validation Error
     */
    habits_admin_delete_api_v5_admin_habits__delete(metadata: types.HabitsAdminDeleteApiV5AdminHabitsDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get one habit
     *
     * @summary Get one habit
     * @throws FetchError<422, types.HabitsAdminGetOneApiV5AdminHabitsHabitIdGetResponse422> Validation Error
     */
    habits_admin_get_one_api_v5_admin_habits__habit_id__get(metadata: types.HabitsAdminGetOneApiV5AdminHabitsHabitIdGetMetadataParam): Promise<FetchResponse<200, types.HabitsAdminGetOneApiV5AdminHabitsHabitIdGetResponse200>>;
    /**
     * Update habit question.
     *
     * @summary Update habit question
     * @throws FetchError<422, types.HabitQuestionsAdminUpdateApiV5AdminHabitQuestionsPutResponse422> Validation Error
     */
    habit_questions_admin_update_api_v5_admin_habit_questions__put(body: types.HabitQuestionsAdminUpdateApiV5AdminHabitQuestionsPutBodyParam): Promise<FetchResponse<200, types.HabitQuestionsAdminUpdateApiV5AdminHabitQuestionsPutResponse200>>;
    /**
     * Create habit question.
     *
     * @summary Create habit question
     * @throws FetchError<422, types.HabitQuestionsAdminCreateApiV5AdminHabitQuestionsPostResponse422> Validation Error
     */
    habit_questions_admin_create_api_v5_admin_habit_questions__post(body: types.HabitQuestionsAdminCreateApiV5AdminHabitQuestionsPostBodyParam): Promise<FetchResponse<201, types.HabitQuestionsAdminCreateApiV5AdminHabitQuestionsPostResponse201>>;
    /**
     * Delete habit question
     *
     * @summary Delete habit question
     * @throws FetchError<422, types.HabitQuestionsAdminDeleteApiV5AdminHabitQuestionsDeleteResponse422> Validation Error
     */
    habit_questions_admin_delete_api_v5_admin_habit_questions__delete(metadata: types.HabitQuestionsAdminDeleteApiV5AdminHabitQuestionsDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Update habit possible answer
     *
     * @summary Update habit possible answer
     * @throws FetchError<422, types.HabitPossibleAnswersAdminUpdateApiV5AdminHabitPossibleAnswersPutResponse422> Validation Error
     */
    habit_possible_answers_admin_update_api_v5_admin_habit_possible_answers__put(body: types.HabitPossibleAnswersAdminUpdateApiV5AdminHabitPossibleAnswersPutBodyParam): Promise<FetchResponse<200, types.HabitPossibleAnswersAdminUpdateApiV5AdminHabitPossibleAnswersPutResponse200>>;
    /**
     * Create habit possible answer
     *
     * @summary Create habit possible answer
     * @throws FetchError<422, types.HabitPossibleAnswersAdminCreateApiV5AdminHabitPossibleAnswersPostResponse422> Validation Error
     */
    habit_possible_answers_admin_create_api_v5_admin_habit_possible_answers__post(body: types.HabitPossibleAnswersAdminCreateApiV5AdminHabitPossibleAnswersPostBodyParam): Promise<FetchResponse<201, types.HabitPossibleAnswersAdminCreateApiV5AdminHabitPossibleAnswersPostResponse201>>;
    /**
     * Delete habit possible answer
     *
     * @summary Delete habit possible answer
     * @throws FetchError<422, types.HabitPossibleAnswersAdminDeleteApiV5AdminHabitPossibleAnswersDeleteResponse422> Validation Error
     */
    habit_possible_answers_admin_delete_api_v5_admin_habit_possible_answers__delete(metadata: types.HabitPossibleAnswersAdminDeleteApiV5AdminHabitPossibleAnswersDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get granted poke permissions by user id
     *
     * @summary Get granted poke permissions
     * @throws FetchError<422, types.PokePermissionsAdminGetUserPokePermissionsApiV5AdminPokePermissionsGrantedGetResponse422> Validation Error
     */
    poke_permissions_admin_get_user_poke_permissions_api_v5_admin_poke_permissions_granted_get(metadata: types.PokePermissionsAdminGetUserPokePermissionsApiV5AdminPokePermissionsGrantedGetMetadataParam): Promise<FetchResponse<200, types.PokePermissionsAdminGetUserPokePermissionsApiV5AdminPokePermissionsGrantedGetResponse200>>;
    /**
     * Get received poke permissions by user id
     *
     * @summary Get received poke permissions
     * @throws FetchError<422, types.PokePermissionsAdminGetReceivedPokePermissionsApiV5AdminPokePermissionsReceivedGetResponse422> Validation Error
     */
    poke_permissions_admin_get_received_poke_permissions_api_v5_admin_poke_permissions_received_get(metadata: types.PokePermissionsAdminGetReceivedPokePermissionsApiV5AdminPokePermissionsReceivedGetMetadataParam): Promise<FetchResponse<200, types.PokePermissionsAdminGetReceivedPokePermissionsApiV5AdminPokePermissionsReceivedGetResponse200>>;
    /**
     * Delete a poke permission
     *
     * @summary Delete a poke permission
     * @throws FetchError<422, types.PokePermissionsAdminDeletePokePermissionApiV5AdminPokePermissionsPokePermissionIdDeleteResponse422> Validation Error
     */
    poke_permissions_admin_delete_poke_permission_api_v5_admin_poke_permissions__poke_permission_id__delete(metadata: types.PokePermissionsAdminDeletePokePermissionApiV5AdminPokePermissionsPokePermissionIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get staff users
     *
     */
    users_admin_get_staff_api_v5_admin_users_staff_get(): Promise<FetchResponse<200, types.UsersAdminGetStaffApiV5AdminUsersStaffGetResponse200>>;
    /**
     * Get one user
     *
     * @throws FetchError<422, types.UsersAdminGetOneApiV5AdminUsersUserIdGetResponse422> Validation Error
     */
    users_admin_get_one_api_v5_admin_users__user_id__get(metadata: types.UsersAdminGetOneApiV5AdminUsersUserIdGetMetadataParam): Promise<FetchResponse<200, types.UsersAdminGetOneApiV5AdminUsersUserIdGetResponse200>>;
    /**
     * Update user
     *
     * @throws FetchError<422, types.UsersAdminUpdateUserApiV5AdminUsersUserIdPutResponse422> Validation Error
     */
    users_admin_update_user_api_v5_admin_users__user_id__put(body: types.UsersAdminUpdateUserApiV5AdminUsersUserIdPutBodyParam, metadata: types.UsersAdminUpdateUserApiV5AdminUsersUserIdPutMetadataParam): Promise<FetchResponse<200, types.UsersAdminUpdateUserApiV5AdminUsersUserIdPutResponse200>>;
    /**
     * Get all users for admin dashboard
     *
     * @summary Get all users
     * @throws FetchError<422, types.UsersAdminGetAllApiV5AdminUsersGetResponse422> Validation Error
     */
    users_admin_get_all_api_v5_admin_users__get(metadata?: types.UsersAdminGetAllApiV5AdminUsersGetMetadataParam): Promise<FetchResponse<200, types.UsersAdminGetAllApiV5AdminUsersGetResponse200>>;
    /**
     * Any: no one can update his role, no one can add a new root;
     * Root: can update any account.
     * SuperAdmin: can assign SuperAdmin, Admin, Coach, support
     * Admin: can assign Coach, support
     *
     * @summary Update user role
     * @throws FetchError<422, types.UsersAdminUpdateUserRoleApiV5AdminUsersUpdateUserRolePutResponse422> Validation Error
     */
    users_admin_update_user_role_api_v5_admin_users_update_user_role_put(body: types.UsersAdminUpdateUserRoleApiV5AdminUsersUpdateUserRolePutBodyParam): Promise<FetchResponse<200, types.UsersAdminUpdateUserRoleApiV5AdminUsersUpdateUserRolePutResponse200>>;
    /**
     * Update user password
     *
     * @throws FetchError<422, types.UsersAdminUpdateUserPasswordApiV5AdminUsersUserIdChangePasswordPutResponse422> Validation Error
     */
    users_admin_update_user_password_api_v5_admin_users__user_id__change_password_put(body: types.UsersAdminUpdateUserPasswordApiV5AdminUsersUserIdChangePasswordPutBodyParam, metadata: types.UsersAdminUpdateUserPasswordApiV5AdminUsersUserIdChangePasswordPutMetadataParam): Promise<FetchResponse<200, types.UsersAdminUpdateUserPasswordApiV5AdminUsersUserIdChangePasswordPutResponse200>>;
    /**
     * Sends a "Forget Password" email to the email address in of the specified user
     *
     * @summary Send reset email
     * @throws FetchError<422, types.UsersAdminSendResetEmailApiV5AdminUsersUserIdResetPasswordEmailPostResponse422> Validation Error
     */
    users_admin_send_reset_email_api_v5_admin_users__user_id__reset_password_email_post(metadata: types.UsersAdminSendResetEmailApiV5AdminUsersUserIdResetPasswordEmailPostMetadataParam): Promise<FetchResponse<200, types.UsersAdminSendResetEmailApiV5AdminUsersUserIdResetPasswordEmailPostResponse200>>;
    /**
     * Resend confirmation email to specific user
     *
     * @summary Resend confirmation email
     * @throws FetchError<422, types.UsersAdminResendConfirmEmailApiV5AdminUsersUserIdResendConfirmEmailPostResponse422> Validation Error
     */
    users_admin_resend_confirm_email_api_v5_admin_users__user_id__resend_confirm_email_post(metadata: types.UsersAdminResendConfirmEmailApiV5AdminUsersUserIdResendConfirmEmailPostMetadataParam): Promise<FetchResponse<200, types.UsersAdminResendConfirmEmailApiV5AdminUsersUserIdResendConfirmEmailPostResponse200>>;
    /**
     * Get user's devices
     *
     * @summary Get user's devices
     * @throws FetchError<422, types.DevicesAdminGetByUserIdApiV5AdminDevicesGetResponse422> Validation Error
     */
    devices_admin_get_by_user_id_api_v5_admin_devices__get(metadata: types.DevicesAdminGetByUserIdApiV5AdminDevicesGetMetadataParam): Promise<FetchResponse<200, types.DevicesAdminGetByUserIdApiV5AdminDevicesGetResponse200>>;
    /**
     * Get all users' devices for admin dashboard
     *
     * @summary Get all users' devices
     * @throws FetchError<422, types.DevicesAdminGetAllApiV5AdminDevicesAllGetResponse422> Validation Error
     */
    devices_admin_get_all_api_v5_admin_devices_all_get(metadata?: types.DevicesAdminGetAllApiV5AdminDevicesAllGetMetadataParam): Promise<FetchResponse<200, types.DevicesAdminGetAllApiV5AdminDevicesAllGetResponse200>>;
    /**
     * Get one user device for admin dashboard
     *
     * @summary Get one user device
     * @throws FetchError<422, types.DevicesAdminGetOneApiV5AdminDevicesDeviceIdGetResponse422> Validation Error
     */
    devices_admin_get_one_api_v5_admin_devices__device_id__get(metadata: types.DevicesAdminGetOneApiV5AdminDevicesDeviceIdGetMetadataParam): Promise<FetchResponse<200, types.DevicesAdminGetOneApiV5AdminDevicesDeviceIdGetResponse200>>;
    /**
     * Get sleep datasets by user id
     *
     * @summary Get sleep datasets
     * @throws FetchError<422, types.SleepDatasetsAdminGetListApiV5AdminSleepDatasetsGetResponse422> Validation Error
     */
    sleep_datasets_admin_get_list_api_v5_admin_sleep_datasets__get(metadata: types.SleepDatasetsAdminGetListApiV5AdminSleepDatasetsGetMetadataParam): Promise<FetchResponse<200, types.SleepDatasetsAdminGetListApiV5AdminSleepDatasetsGetResponse200>>;
    /**
     * Get user's phone devices
     *
     * @summary Get user's phone devices
     * @throws FetchError<422, types.PhoneDevicesAdminGetListApiV5AdminPhoneDevicesGetResponse422> Validation Error
     */
    phone_devices_admin_get_list_api_v5_admin_phone_devices__get(metadata: types.PhoneDevicesAdminGetListApiV5AdminPhoneDevicesGetMetadataParam): Promise<FetchResponse<200, types.PhoneDevicesAdminGetListApiV5AdminPhoneDevicesGetResponse200>>;
    /**
     * Get user's volts transactions
     *
     * @summary Get user's volts transactions
     * @throws FetchError<422, types.VoltsTransactionsAdminGetListApiV5AdminVoltsTransactionsGetResponse422> Validation Error
     */
    volts_transactions_admin_get_list_api_v5_admin_volts_transactions__get(metadata: types.VoltsTransactionsAdminGetListApiV5AdminVoltsTransactionsGetMetadataParam): Promise<FetchResponse<200, types.VoltsTransactionsAdminGetListApiV5AdminVoltsTransactionsGetResponse200>>;
    /**
     * Get user habits
     *
     * @throws FetchError<422, types.UsersAdminGetUserHabitsApiV5AdminUserHabitsGetResponse422> Validation Error
     */
    users_admin_get_user_habits_api_v5_admin_user_habits__get(metadata: types.UsersAdminGetUserHabitsApiV5AdminUserHabitsGetMetadataParam): Promise<FetchResponse<200, types.UsersAdminGetUserHabitsApiV5AdminUserHabitsGetResponse200>>;
    /**
     * Get all entitlement on revenue cat
     *
     * @summary Get all entitlement
     */
    revenue_cat_admin_get_revenue_cat_entitlements_api_v5_admin_entitlements__get(): Promise<FetchResponse<200, types.RevenueCatAdminGetRevenueCatEntitlementsApiV5AdminEntitlementsGetResponse200>>;
    /**
     * Get list of user entitlements
     *
     * @throws FetchError<422, types.UsersAdminGetUserEntitlementsApiV5AdminEntitlementsUserIdGetResponse422> Validation Error
     */
    users_admin_get_user_entitlements_api_v5_admin_entitlements__user_id__get(metadata: types.UsersAdminGetUserEntitlementsApiV5AdminEntitlementsUserIdGetMetadataParam): Promise<FetchResponse<200, types.UsersAdminGetUserEntitlementsApiV5AdminEntitlementsUserIdGetResponse200>>;
    /**
     * Get all volts actions
     *
     * @summary Get all volts actions
     */
    volts_actions_admin_get_all_api_v5_admin_volts_actions__get(): Promise<FetchResponse<200, types.VoltsActionsAdminGetAllApiV5AdminVoltsActionsGetResponse200>>;
    /**
     * Update volts action
     *
     * @summary Update volts action
     * @throws FetchError<422, types.VoltsActionsAdminUpdateApiV5AdminVoltsActionsPutResponse422> Validation Error
     */
    volts_actions_admin_update_api_v5_admin_volts_actions__put(body: types.VoltsActionsAdminUpdateApiV5AdminVoltsActionsPutBodyParam): Promise<FetchResponse<200, types.VoltsActionsAdminUpdateApiV5AdminVoltsActionsPutResponse200>>;
    /**
     * Create volts action
     *
     * @summary Create volts action
     * @throws FetchError<422, types.VoltsActionsAdminCreateApiV5AdminVoltsActionsPostResponse422> Validation Error
     */
    volts_actions_admin_create_api_v5_admin_volts_actions__post(body: types.VoltsActionsAdminCreateApiV5AdminVoltsActionsPostBodyParam): Promise<FetchResponse<201, types.VoltsActionsAdminCreateApiV5AdminVoltsActionsPostResponse201>>;
    /**
     * Get volts action by key
     *
     * @summary Get volts action by key
     * @throws FetchError<422, types.VoltsActionsAdminGetByKeyApiV5AdminVoltsActionsGetByKeyVoltsActionKeyGetResponse422> Validation Error
     */
    volts_actions_admin_get_by_key_api_v5_admin_volts_actions_get_by_key__volts_action_key__get(metadata: types.VoltsActionsAdminGetByKeyApiV5AdminVoltsActionsGetByKeyVoltsActionKeyGetMetadataParam): Promise<FetchResponse<200, types.VoltsActionsAdminGetByKeyApiV5AdminVoltsActionsGetByKeyVoltsActionKeyGetResponse200>>;
    /**
     * Get volts action by id
     *
     * @summary Get volts action by id
     * @throws FetchError<422, types.VoltsActionsAdminGetByIdApiV5AdminVoltsActionsGetByIdVoltsActionIdGetResponse422> Validation Error
     */
    volts_actions_admin_get_by_id_api_v5_admin_volts_actions_get_by_id__volts_action_id__get(metadata: types.VoltsActionsAdminGetByIdApiV5AdminVoltsActionsGetByIdVoltsActionIdGetMetadataParam): Promise<FetchResponse<200, types.VoltsActionsAdminGetByIdApiV5AdminVoltsActionsGetByIdVoltsActionIdGetResponse200>>;
    /**
     * Delete volts action
     *
     * @summary Delete volts action
     * @throws FetchError<422, types.VoltsActionsAdminDeleteApiV5AdminVoltsActionsVoltsActionIdDeleteResponse422> Validation Error
     */
    volts_actions_admin_delete_api_v5_admin_volts_actions__volts_action_id__delete(metadata: types.VoltsActionsAdminDeleteApiV5AdminVoltsActionsVoltsActionIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Admin only: Add volts to current user's wallet
     *
     * @summary Admin only: Add volts to current user's wallet
     * @throws FetchError<422, types.WalletsAdminAddVoltsApiV5AdminWalletsAddVoltsPutResponse422> Validation Error
     */
    wallets_admin_add_volts_api_v5_admin_wallets_add_volts_put(body: types.WalletsAdminAddVoltsApiV5AdminWalletsAddVoltsPutBodyParam): Promise<FetchResponse<200, types.WalletsAdminAddVoltsApiV5AdminWalletsAddVoltsPutResponse200>>;
    /**
     * Get all stimulus in a pagination response
     *
     * @summary Get stimulus
     * @throws FetchError<422, types.StimulusAdminGetAllByFiltersPaginatedApiV5AdminStimulusAllGetResponse422> Validation Error
     */
    stimulus_admin_get_all_by_filters_paginated_api_v5_admin_stimulus_all__get(metadata?: types.StimulusAdminGetAllByFiltersPaginatedApiV5AdminStimulusAllGetMetadataParam): Promise<FetchResponse<200, types.StimulusAdminGetAllByFiltersPaginatedApiV5AdminStimulusAllGetResponse200>>;
    /**
     * Get list of campaigns
     *
     * @summary Get list of campaigns
     */
    campaigns_admin_get_all_api_v5_admin_campaigns__get(): Promise<FetchResponse<200, types.CampaignsAdminGetAllApiV5AdminCampaignsGetResponse200>>;
    /**
     * Create campaign and send notifications to all subscribers of the specified topic
     *
     * @summary Create campaign
     * @throws FetchError<422, types.CampaignsAdminCreateApiV5AdminCampaignsPostResponse422> Validation Error
     */
    campaigns_admin_create_api_v5_admin_campaigns__post(body: types.CampaignsAdminCreateApiV5AdminCampaignsPostBodyParam): Promise<FetchResponse<200, types.CampaignsAdminCreateApiV5AdminCampaignsPostResponse200>>;
    /**
     * Get campaign with stats by id
     *
     * @summary Get campaign with stats by id
     * @throws FetchError<422, types.CampaignsAdminGetOneApiV5AdminCampaignsCampaignIdGetResponse422> Validation Error
     */
    campaigns_admin_get_one_api_v5_admin_campaigns__campaign_id__get(metadata: types.CampaignsAdminGetOneApiV5AdminCampaignsCampaignIdGetMetadataParam): Promise<FetchResponse<200, types.CampaignsAdminGetOneApiV5AdminCampaignsCampaignIdGetResponse200>>;
    /**
     * Get list of valid fcm topics and their users count
     *
     * @summary Get fcm topics
     */
    fcm_topics_admin_get_fcm_topics_api_v5_admin_fcm_topics__get(): Promise<FetchResponse<200, types.FcmTopicsAdminGetFcmTopicsApiV5AdminFcmTopicsGetResponse200>>;
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
    google_analytics_run_report_api_v5_admin_google_analytics__post(body: types.GoogleAnalyticsRunReportApiV5AdminGoogleAnalyticsPostBodyParam): Promise<FetchResponse<200, types.GoogleAnalyticsRunReportApiV5AdminGoogleAnalyticsPostResponse200>>;
    /**
     * Launches the specified celery task with the specified parameters
     *
     * @summary Launches the specified celery task
     * @throws FetchError<422, types.CeleryTasksAdminAdminReviewsSyncApiV5AdminCeleryTasksPostResponse422> Validation Error
     */
    celery_tasks_admin_admin_reviews_sync_api_v5_admin_celery_tasks__post(body: types.CeleryTasksAdminAdminReviewsSyncApiV5AdminCeleryTasksPostBodyParam): Promise<FetchResponse<200, types.CeleryTasksAdminAdminReviewsSyncApiV5AdminCeleryTasksPostResponse200>>;
    /**
     * Initialize Intercom app
     *
     */
    intercom_initialize_api_v5_intercom_initialize_post(): Promise<FetchResponse<200, types.IntercomInitializeApiV5IntercomInitializePostResponse200>>;
    /**
     * Refresh Intercom app date
     *
     */
    intercom_submit_api_v5_intercom_submit_post(): Promise<FetchResponse<200, types.IntercomSubmitApiV5IntercomSubmitPostResponse200>>;
    /**
     * Oauth logout
     *
     */
    route_logout_and_remove_cookie_api_v5_oauth_logout_get(): Promise<FetchResponse<200, types.RouteLogoutAndRemoveCookieApiV5OauthLogoutGetResponse200>>;
    /**
     * Return the login form page
     *
     * @summary Oauth login page
     * @throws FetchError<422, types.OauthAuthenticationLoginApiV5OauthLoginGetResponse422> Validation Error
     */
    oauth_authentication_login_api_v5_oauth_login_get(metadata?: types.OauthAuthenticationLoginApiV5OauthLoginGetMetadataParam): Promise<FetchResponse<200, types.OauthAuthenticationLoginApiV5OauthLoginGetResponse200>>;
    /**
     * Handle the login.
     *
     * @summary Oauth login
     * @throws FetchError<422, types.LoginHandlerApiV5OauthLoginPostResponse422> Validation Error
     */
    login_handler_api_v5_oauth_login_post(body: types.LoginHandlerApiV5OauthLoginPostBodyParam): Promise<FetchResponse<200, types.LoginHandlerApiV5OauthLoginPostResponse200>>;
    /**
     * Oauth app authorize page
     *
     * @summary OAuth authorize
     * @throws FetchError<422, types.OauthAuthorizeApiV5OauthAuthorizeGetResponse422> Validation Error
     */
    oauth_authorize_api_v5_oauth_authorize_get(metadata?: types.OauthAuthorizeApiV5OauthAuthorizeGetMetadataParam): Promise<FetchResponse<200, types.OauthAuthorizeApiV5OauthAuthorizeGetResponse200>>;
    /**
     * Authorized the application to do action on behalf you.
     *
     * @summary Oauth:Authorize
     * @throws FetchError<422, types.OauthAuthorizeApiV5OauthAuthorizePostResponse422> Validation Error
     */
    oauth_authorize_api_v5_oauth_authorize_post(body: types.OauthAuthorizeApiV5OauthAuthorizePostFormDataParam): Promise<FetchResponse<200, types.OauthAuthorizeApiV5OauthAuthorizePostResponse200>>;
    /**
     * Return the user token
     *
     * @summary Oauth:Token
     * @throws FetchError<422, types.OauthTokenApiV5OauthTokenPostResponse422> Validation Error
     */
    oauth_token_api_v5_oauth_token_post(body: types.OauthTokenApiV5OauthTokenPostFormDataParam): Promise<FetchResponse<200, types.OauthTokenApiV5OauthTokenPostResponse200>>;
    /**
     * We use this endpoint only to test if the autorize feature is working. Create new Oauth
     * app and give it this redirect url
     *
     * @summary Oauth:Redirect
     * @throws FetchError<422, types.OauthRedirectApiV5OauthRedirectTestGetResponse422> Validation Error
     */
    oauth_redirect_api_v5_oauth_redirect_test_get(metadata?: types.OauthRedirectApiV5OauthRedirectTestGetMetadataParam): Promise<FetchResponse<200, types.OauthRedirectApiV5OauthRedirectTestGetResponse200>>;
    /**
     * Page to list of applications
     *
     * @summary Oauth application list
     */
    oauth_applications_list_api_v5_oauth_applications__get(): Promise<FetchResponse<200, types.OauthApplicationsListApiV5OauthApplicationsGetResponse200>>;
    /**
     * Page to new application form
     *
     * @summary Oauth new application page
     */
    oauth_new_application_page_api_v5_oauth_applications_new_get(): Promise<FetchResponse<200, types.OauthNewApplicationPageApiV5OauthApplicationsNewGetResponse200>>;
    /**
     * New application handler
     *
     * @summary Create new Oauth app
     * @throws FetchError<422, types.OauthNewApplicationHandlerApiV5OauthApplicationsNewPostResponse422> Validation Error
     */
    oauth_new_application_handler_api_v5_oauth_applications_new_post(body: types.OauthNewApplicationHandlerApiV5OauthApplicationsNewPostBodyParam): Promise<FetchResponse<201, types.OauthNewApplicationHandlerApiV5OauthApplicationsNewPostResponse201>>;
    /**
     * Page see details of single application
     *
     * @summary Edit oauth app page
     * @throws FetchError<422, types.OauthEditApplicationPageApiV5OauthApplicationsOauthApplicationIdEditGetResponse422> Validation Error
     */
    oauth_edit_application_page_api_v5_oauth_applications__oauth_application_id__edit_get(metadata: types.OauthEditApplicationPageApiV5OauthApplicationsOauthApplicationIdEditGetMetadataParam): Promise<FetchResponse<200, types.OauthEditApplicationPageApiV5OauthApplicationsOauthApplicationIdEditGetResponse200>>;
    /**
     * Page to new application form
     *
     * @summary Edit Oauth app
     * @throws FetchError<422, types.OauthEditApplicationHandlerApiV5OauthApplicationsOauthApplicationIdEditPostResponse422> Validation Error
     */
    oauth_edit_application_handler_api_v5_oauth_applications__oauth_application_id__edit_post(body: types.OauthEditApplicationHandlerApiV5OauthApplicationsOauthApplicationIdEditPostBodyParam, metadata: types.OauthEditApplicationHandlerApiV5OauthApplicationsOauthApplicationIdEditPostMetadataParam): Promise<FetchResponse<201, types.OauthEditApplicationHandlerApiV5OauthApplicationsOauthApplicationIdEditPostResponse201>>;
    /**
     * Page see details of single application
     *
     * @summary Get oauth app by id
     * @throws FetchError<422, types.OauthApplicationDetailsPageApiV5OauthApplicationsOauthApplicationIdGetResponse422> Validation Error
     */
    oauth_application_details_page_api_v5_oauth_applications__oauth_application_id__get(metadata: types.OauthApplicationDetailsPageApiV5OauthApplicationsOauthApplicationIdGetMetadataParam): Promise<FetchResponse<200, types.OauthApplicationDetailsPageApiV5OauthApplicationsOauthApplicationIdGetResponse200>>;
    /**
     * Page to list of applications
     *
     * @summary Oauth:Applications:Delete
     * @throws FetchError<422, types.OauthApplicationsDeleteApiV5OauthApplicationsOauthApplicationIdDeletePostResponse422> Validation Error
     */
    oauth_applications_delete_api_v5_oauth_applications__oauth_application_id__delete_post(metadata: types.OauthApplicationsDeleteApiV5OauthApplicationsOauthApplicationIdDeletePostMetadataParam): Promise<FetchResponse<200, types.OauthApplicationsDeleteApiV5OauthApplicationsOauthApplicationIdDeletePostResponse200>>;
    /**
     * Check if email is taken
     *
     * @throws FetchError<422, types.AuthCheckIfEmailTakenApiV5UsersCheckIfEmailTakenPostResponse422> Validation Error
     */
    auth_check_if_email_taken_api_v5_users_check_if_email_taken_post(body: types.AuthCheckIfEmailTakenApiV5UsersCheckIfEmailTakenPostBodyParam): Promise<FetchResponse<200, types.AuthCheckIfEmailTakenApiV5UsersCheckIfEmailTakenPostResponse200>>;
    /**
     * Login
     *
     * @throws FetchError<422, types.AuthLoginApiV5UsersLoginPostResponse422> Validation Error
     */
    auth_login_api_v5_users_login_post(body: types.AuthLoginApiV5UsersLoginPostBodyParam): Promise<FetchResponse<200, types.AuthLoginApiV5UsersLoginPostResponse200>>;
    /**
     * Register
     *
     * @throws FetchError<422, types.AuthRegisterApiV5UsersPostResponse422> Validation Error
     */
    auth_register_api_v5_users__post(body: types.AuthRegisterApiV5UsersPostBodyParam): Promise<FetchResponse<201, types.AuthRegisterApiV5UsersPostResponse201>>;
    /**
     * Sends a "Forget Password" email to the email address in the input
     *
     * @summary Forget password
     * @throws FetchError<422, types.AuthForgetPasswordApiV5UsersForgetPasswordPostResponse422> Validation Error
     */
    auth_forget_password_api_v5_users_forget_password_post(body: types.AuthForgetPasswordApiV5UsersForgetPasswordPostBodyParam): Promise<FetchResponse<200, types.AuthForgetPasswordApiV5UsersForgetPasswordPostResponse200>>;
    /**
     * reset password page
     * :return:
     *
     * @summary Reset password page
     * @throws FetchError<422, types.AuthResetPasswordPageApiV5UsersResetPasswordGetResponse422> Validation Error
     */
    auth_reset_password_page_api_v5_users_reset_password_get(metadata: types.AuthResetPasswordPageApiV5UsersResetPasswordGetMetadataParam): Promise<FetchResponse<200, types.AuthResetPasswordPageApiV5UsersResetPasswordGetResponse200>>;
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
    auth_reset_password_api_v5_users_reset_password_put(body: types.AuthResetPasswordApiV5UsersResetPasswordPutBodyParam): Promise<FetchResponse<200, types.AuthResetPasswordApiV5UsersResetPasswordPutResponse200>>;
    /**
     * Get current user
     *
     */
    users_get_current_user_api_v5_user__get(): Promise<FetchResponse<200, types.UsersGetCurrentUserApiV5UserGetResponse200>>;
    /**
     * Update current user
     *
     * @throws FetchError<422, types.UsersUpdateCurrentUserApiV5UserPutResponse422> Validation Error
     */
    users_update_current_user_api_v5_user__put(body: types.UsersUpdateCurrentUserApiV5UserPutBodyParam): Promise<FetchResponse<200, types.UsersUpdateCurrentUserApiV5UserPutResponse200>>;
    /**
     * Hard delete current user account
     *
     * @summary Hard delete current user account
     */
    users_delete_api_v5_user__delete(): Promise<FetchResponse<number, unknown>>;
    /**
     * Update current user password
     *
     * @throws FetchError<422, types.UsersUpdateCurrentUserPasswordApiV5UserChangePasswordPutResponse422> Validation Error
     */
    users_update_current_user_password_api_v5_user_change_password_put(body: types.UsersUpdateCurrentUserPasswordApiV5UserChangePasswordPutBodyParam): Promise<FetchResponse<200, types.UsersUpdateCurrentUserPasswordApiV5UserChangePasswordPutResponse200>>;
    /**
     * Sends OTP to user and updates his phone number. Phone number confirmed field is set to
     * False.
     *
     * @summary Sends OTP to user
     * @throws FetchError<422, types.UsersUpdatePhoneNumberApiV5UserUpdatePhoneNumberPutResponse422> Validation Error
     */
    users_update_phone_number_api_v5_user_update_phone_number_put(body: types.UsersUpdatePhoneNumberApiV5UserUpdatePhoneNumberPutBodyParam): Promise<FetchResponse<200, types.UsersUpdatePhoneNumberApiV5UserUpdatePhoneNumberPutResponse200>>;
    /**
     * Validate OTP. Phone number confirmed field is set to True if OTP is valid.
     *
     * @summary Validate OTP
     * @throws FetchError<422, types.UsersValidateOtpApiV5UserValidateOtpPostResponse422> Validation Error
     */
    users_validate_otp_api_v5_user_validate_otp_post(body: types.UsersValidateOtpApiV5UserValidateOtpPostBodyParam): Promise<FetchResponse<200, types.UsersValidateOtpApiV5UserValidateOtpPostResponse200>>;
    /**
     * Users:Confirm-Email-User
     *
     * @throws FetchError<422, types.UsersConfirmEmailUserApiV5UserEmailConfirmTokenGetResponse422> Validation Error
     */
    users_confirm_email_user_api_v5_user_email_confirm__token__get(metadata: types.UsersConfirmEmailUserApiV5UserEmailConfirmTokenGetMetadataParam): Promise<FetchResponse<200, types.UsersConfirmEmailUserApiV5UserEmailConfirmTokenGetResponse200>>;
    /**
     * Check if current user is pavlok admin
     *
     * @summary Check if user is pavlok admin
     */
    users_is_pavlok_admin_api_v5_user_is_pavlok_admin_get(): Promise<FetchResponse<200, types.UsersIsPavlokAdminApiV5UserIsPavlokAdminGetResponse200>>;
    /**
     * Soft delete current user account
     *
     * @summary Soft delete current user account
     */
    users_soft_delete_api_v5_user_delete_account_delete(): Promise<FetchResponse<number, unknown>>;
    /**
     * Check if user is root
     *
     */
    users_check_current_user_role_root_api_v5_user_role_is_root_get(): Promise<FetchResponse<200, types.UsersCheckCurrentUserRoleRootApiV5UserRoleIsRootGetResponse200>>;
    /**
     * Check if user is super admin
     *
     */
    users_check_current_user_role_super_admin_api_v5_user_role_is_super_admin_get(): Promise<FetchResponse<200, types.UsersCheckCurrentUserRoleSuperAdminApiV5UserRoleIsSuperAdminGetResponse200>>;
    /**
     * Check if user is admin
     *
     */
    users_check_current_user_role_admin_api_v5_user_role_is_admin_get(): Promise<FetchResponse<200, types.UsersCheckCurrentUserRoleAdminApiV5UserRoleIsAdminGetResponse200>>;
    /**
     * Check if user is coach
     *
     */
    users_check_current_user_role_coach_api_v5_user_role_is_coach_get(): Promise<FetchResponse<200, types.UsersCheckCurrentUserRoleCoachApiV5UserRoleIsCoachGetResponse200>>;
    /**
     * Check if user is support
     *
     */
    users_check_current_user_role_support_api_v5_user_role_is_support_get(): Promise<FetchResponse<200, types.UsersCheckCurrentUserRoleSupportApiV5UserRoleIsSupportGetResponse200>>;
    /**
     * Create (or update if exists) user setting
     *
     * @summary Upsert user setting
     * @throws FetchError<422, types.UserSettingsUpsertApiV5UserSettingsPostResponse422> Validation Error
     */
    user_settings_upsert_api_v5_user_settings__post(body: types.UserSettingsUpsertApiV5UserSettingsPostBodyParam): Promise<FetchResponse<201, types.UserSettingsUpsertApiV5UserSettingsPostResponse201>>;
    /**
     * Delete user setting
     *
     * @summary Delete user setting
     * @throws FetchError<422, types.UserSettingsDeleteApiV5UserSettingsDeleteResponse422> Validation Error
     */
    user_settings_delete_api_v5_user_settings__delete(metadata: types.UserSettingsDeleteApiV5UserSettingsDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Search for user
     *
     * @summary Search for user
     * @throws FetchError<422, types.UsersSearchApiV5UsersSearchGetResponse422> Validation Error
     */
    users_search_api_v5_users_search_get(metadata?: types.UsersSearchApiV5UsersSearchGetMetadataParam): Promise<FetchResponse<200, types.UsersSearchApiV5UsersSearchGetResponse200>>;
    /**
     * Get user with friendship by id
     *
     * @summary Get user with friendship
     * @throws FetchError<422, types.UsersGetUserByIdApiV5UsersGetUserByIdGetResponse422> Validation Error
     */
    users_get_user_by_id_api_v5_users_get_user_by_id_get(metadata: types.UsersGetUserByIdApiV5UsersGetUserByIdGetMetadataParam): Promise<FetchResponse<200, types.UsersGetUserByIdApiV5UsersGetUserByIdGetResponse200>>;
    /**
     * Get friends suggestions
     *
     * @summary Get friends suggestions
     */
    users_get_friends_suggestions_api_v5_users_friends_suggestions_get(): Promise<FetchResponse<200, types.UsersGetFriendsSuggestionsApiV5UsersFriendsSuggestionsGetResponse200>>;
    /**
     * Get user info
     * @return: IftttUser
     *
     * @summary IFTTT get info
     */
    ifttt_v1_user_get_info_api_v5_ifttt_v1_user_info_get(): Promise<FetchResponse<200, types.IftttV1UserGetInfoApiV5IftttV1UserInfoGetResponse200>>;
    /**
     * IFTTT status
     *
     */
    ifttt_v1_status_api_v5_ifttt_v1_status_get(): Promise<FetchResponse<200, types.IftttV1StatusApiV5IftttV1StatusGetResponse200>>;
    /**
     * IFTTT test setup
     *
     */
    ifttt_v1_test_setup_api_v5_ifttt_v1_test_setup_post(): Promise<FetchResponse<200, types.IftttV1TestSetupApiV5IftttV1TestSetupPostResponse200>>;
    /**
     * IFTTT vibrate action
     *
     * @throws FetchError<422, types.IftttV1ActionsVibrateApiV5IftttV1ActionsVibratePostResponse422> Validation Error
     */
    ifttt_v1_actions_vibrate_api_v5_ifttt_v1_actions_vibrate_post(body: types.IftttV1ActionsVibrateApiV5IftttV1ActionsVibratePostBodyParam): Promise<FetchResponse<200, types.IftttV1ActionsVibrateApiV5IftttV1ActionsVibratePostResponse200>>;
    /**
     * IFTTT vibrate options
     *
     * @throws FetchError<422, types.IftttV1ActionsVibrateOptionsApiV5IftttV1ActionsVibrateFieldsValueOptionsPostResponse422> Validation Error
     */
    ifttt_v1_actions_vibrate_options_api_v5_ifttt_v1_actions_vibrate_fields_value_options_post(body: types.IftttV1ActionsVibrateOptionsApiV5IftttV1ActionsVibrateFieldsValueOptionsPostBodyParam): Promise<FetchResponse<200, types.IftttV1ActionsVibrateOptionsApiV5IftttV1ActionsVibrateFieldsValueOptionsPostResponse200>>;
    /**
     * IFTTT zap action
     *
     * @throws FetchError<422, types.IftttV1ActionsZapApiV5IftttV1ActionsZapPostResponse422> Validation Error
     */
    ifttt_v1_actions_zap_api_v5_ifttt_v1_actions_zap_post(body: types.IftttV1ActionsZapApiV5IftttV1ActionsZapPostBodyParam): Promise<FetchResponse<200, types.IftttV1ActionsZapApiV5IftttV1ActionsZapPostResponse200>>;
    /**
     * IFTTT zap options
     *
     * @throws FetchError<422, types.IftttV1ActionsZapOptionsApiV5IftttV1ActionsZapFieldsValueOptionsPostResponse422> Validation Error
     */
    ifttt_v1_actions_zap_options_api_v5_ifttt_v1_actions_zap_fields_value_options_post(body: types.IftttV1ActionsZapOptionsApiV5IftttV1ActionsZapFieldsValueOptionsPostBodyParam): Promise<FetchResponse<200, types.IftttV1ActionsZapOptionsApiV5IftttV1ActionsZapFieldsValueOptionsPostResponse200>>;
    /**
     * IFTTT beep action
     *
     * @throws FetchError<422, types.IftttV1ActionsBeepApiV5IftttV1ActionsBeepPostResponse422> Validation Error
     */
    ifttt_v1_actions_beep_api_v5_ifttt_v1_actions_beep_post(body: types.IftttV1ActionsBeepApiV5IftttV1ActionsBeepPostBodyParam): Promise<FetchResponse<200, types.IftttV1ActionsBeepApiV5IftttV1ActionsBeepPostResponse200>>;
    /**
     * IFTTT beep options
     *
     * @throws FetchError<422, types.IftttV1ActionsBeepOptionsApiV5IftttV1ActionsBeepFieldsValueOptionsPostResponse422> Validation Error
     */
    ifttt_v1_actions_beep_options_api_v5_ifttt_v1_actions_beep_fields_value_options_post(body: types.IftttV1ActionsBeepOptionsApiV5IftttV1ActionsBeepFieldsValueOptionsPostBodyParam): Promise<FetchResponse<200, types.IftttV1ActionsBeepOptionsApiV5IftttV1ActionsBeepFieldsValueOptionsPostResponse200>>;
    /**
     * IFTTT led action
     *
     * @throws FetchError<422, types.IftttV1ActionsLedApiV5IftttV1ActionsLedPostResponse422> Validation Error
     */
    ifttt_v1_actions_led_api_v5_ifttt_v1_actions_led_post(body: types.IftttV1ActionsLedApiV5IftttV1ActionsLedPostBodyParam): Promise<FetchResponse<200, types.IftttV1ActionsLedApiV5IftttV1ActionsLedPostResponse200>>;
    /**
     * IFTTT led options
     *
     * @throws FetchError<422, types.IftttV1ActionsLedOptionsApiV5IftttV1ActionsLedFieldsValueOptionsPostResponse422> Validation Error
     */
    ifttt_v1_actions_led_options_api_v5_ifttt_v1_actions_led_fields_value_options_post(body: types.IftttV1ActionsLedOptionsApiV5IftttV1ActionsLedFieldsValueOptionsPostBodyParam): Promise<FetchResponse<200, types.IftttV1ActionsLedOptionsApiV5IftttV1ActionsLedFieldsValueOptionsPostResponse200>>;
    /**
     * Get tasks
     *
     */
    tasks_tasks_get_current_user_tasks_api_v5_tasks_tasks_get(): Promise<FetchResponse<200, types.TasksTasksGetCurrentUserTasksApiV5TasksTasksGetResponse200>>;
    /**
     * Create task
     *
     * @throws FetchError<422, types.TasksTasksCreateTaskApiV5TasksTasksPostResponse422> Validation Error
     */
    tasks_tasks_create_task_api_v5_tasks_tasks_post(body: types.TasksTasksCreateTaskApiV5TasksTasksPostBodyParam): Promise<FetchResponse<201, types.TasksTasksCreateTaskApiV5TasksTasksPostResponse201>>;
    /**
     * Get tasks by list id
     *
     * @throws FetchError<422, types.TasksTasksGetCurrentUserTasksByListIdApiV5TasksTasksListListIdGetResponse422> Validation Error
     */
    tasks_tasks_get_current_user_tasks_by_list_id_api_v5_tasks_tasks_list__list_id__get(metadata: types.TasksTasksGetCurrentUserTasksByListIdApiV5TasksTasksListListIdGetMetadataParam): Promise<FetchResponse<200, types.TasksTasksGetCurrentUserTasksByListIdApiV5TasksTasksListListIdGetResponse200>>;
    /**
     * Update task
     *
     * @throws FetchError<422, types.TasksTasksUpdateTaskApiV5TasksTasksTaskIdPutResponse422> Validation Error
     */
    tasks_tasks_update_task_api_v5_tasks_tasks__task_id__put(body: types.TasksTasksUpdateTaskApiV5TasksTasksTaskIdPutBodyParam, metadata: types.TasksTasksUpdateTaskApiV5TasksTasksTaskIdPutMetadataParam): Promise<FetchResponse<200, types.TasksTasksUpdateTaskApiV5TasksTasksTaskIdPutResponse200>>;
    /**
     * Delete task
     *
     * @throws FetchError<422, types.TasksTasksDeleteTaskApiV5TasksTasksTaskIdDeleteResponse422> Validation Error
     */
    tasks_tasks_delete_task_api_v5_tasks_tasks__task_id__delete(metadata: types.TasksTasksDeleteTaskApiV5TasksTasksTaskIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get tasks lists
     *
     */
    tasks_lists_get_current_user_tasks_lists_api_v5_tasks_lists_get(): Promise<FetchResponse<200, types.TasksListsGetCurrentUserTasksListsApiV5TasksListsGetResponse200>>;
    /**
     * Create tasks lists
     *
     * @throws FetchError<422, types.TasksListsCreateTasksListApiV5TasksListsPostResponse422> Validation Error
     */
    tasks_lists_create_tasks_list_api_v5_tasks_lists_post(body: types.TasksListsCreateTasksListApiV5TasksListsPostBodyParam): Promise<FetchResponse<201, types.TasksListsCreateTasksListApiV5TasksListsPostResponse201>>;
    /**
     * Update tasks list
     *
     * @throws FetchError<422, types.TasksListsUpdateTasksListApiV5TasksListsTasksListIdPutResponse422> Validation Error
     */
    tasks_lists_update_tasks_list_api_v5_tasks_lists__tasks_list_id__put(body: types.TasksListsUpdateTasksListApiV5TasksListsTasksListIdPutBodyParam, metadata: types.TasksListsUpdateTasksListApiV5TasksListsTasksListIdPutMetadataParam): Promise<FetchResponse<200, types.TasksListsUpdateTasksListApiV5TasksListsTasksListIdPutResponse200>>;
    /**
     * Delete tasks list
     *
     * @throws FetchError<422, types.TasksListsDeleteTasksListApiV5TasksListsTasksListIdDeleteResponse422> Validation Error
     */
    tasks_lists_delete_tasks_list_api_v5_tasks_lists__tasks_list_id__delete(metadata: types.TasksListsDeleteTasksListApiV5TasksListsTasksListIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get category with it contents
     *
     * @throws FetchError<422, types.ContentsCategoriesGetOneWithContentsApiV5ContentsCategoriesContentsCategoryIdGetResponse422> Validation Error
     */
    contents_categories_get_one_with_contents_api_v5_contents_categories__contents_category_id__get(metadata: types.ContentsCategoriesGetOneWithContentsApiV5ContentsCategoriesContentsCategoryIdGetMetadataParam): Promise<FetchResponse<200, types.ContentsCategoriesGetOneWithContentsApiV5ContentsCategoriesContentsCategoryIdGetResponse200>>;
    /**
     * Get all visible habits
     *
     * @summary Get all visible habits
     */
    habits_read_visible_api_v5_habits_habits__get(): Promise<FetchResponse<200, types.HabitsReadVisibleApiV5HabitsHabitsGetResponse200>>;
    /**
     * Get one habit
     *
     * @summary Get one habit
     * @throws FetchError<422, types.HabitsGetOneApiV5HabitsHabitsHabitIdGetResponse422> Validation Error
     */
    habits_get_one_api_v5_habits_habits__habit_id__get(metadata: types.HabitsGetOneApiV5HabitsHabitsHabitIdGetMetadataParam): Promise<FetchResponse<200, types.HabitsGetOneApiV5HabitsHabitsHabitIdGetResponse200>>;
    /**
     * Update Individual Habit
     *
     * @summary Update Individual Habit
     * @throws FetchError<422, types.HabitsUpdateIndividualApiV5HabitsHabitsIndividualPutResponse422> Validation Error
     */
    habits_update_individual_api_v5_habits_habits_individual_put(body: types.HabitsUpdateIndividualApiV5HabitsHabitsIndividualPutBodyParam): Promise<FetchResponse<200, types.HabitsUpdateIndividualApiV5HabitsHabitsIndividualPutResponse200>>;
    /**
     * Get all User Habits
     *
     * @summary Get all User Habits
     */
    user_habits_read_all_api_v5_habits_user_habits_all_get(): Promise<FetchResponse<200, types.UserHabitsReadAllApiV5HabitsUserHabitsAllGetResponse200>>;
    /**
     * Get all active User Habits for a specific date (Home page)
     *
     * @summary Get active User Habits
     * @throws FetchError<422, types.UserHabitsReadAllActiveApiV5HabitsUserHabitsAllActiveGetResponse422> Validation Error
     */
    user_habits_read_all_active_api_v5_habits_user_habits_all_active_get(metadata: types.UserHabitsReadAllActiveApiV5HabitsUserHabitsAllActiveGetMetadataParam): Promise<FetchResponse<200, types.UserHabitsReadAllActiveApiV5HabitsUserHabitsAllActiveGetResponse200>>;
    /**
     * Get User Habit
     *
     * @summary Get User Habit
     * @throws FetchError<422, types.UserHabitsReadApiV5HabitsUserHabitsGetResponse422> Validation Error
     */
    user_habits_read_api_v5_habits_user_habits__get(metadata: types.UserHabitsReadApiV5HabitsUserHabitsGetMetadataParam): Promise<FetchResponse<200, types.UserHabitsReadApiV5HabitsUserHabitsGetResponse200>>;
    /**
     * Update the the price and the repetition_days of a user habit + the answers to the habit
     * questions
     *
     * @summary Update user habit
     * @throws FetchError<422, types.UserHabitsUpdateApiV5HabitsUserHabitsPutResponse422> Validation Error
     */
    user_habits_update_api_v5_habits_user_habits__put(body: types.UserHabitsUpdateApiV5HabitsUserHabitsPutBodyParam): Promise<FetchResponse<200, types.UserHabitsUpdateApiV5HabitsUserHabitsPutResponse200>>;
    /**
     * Create User Habit
     *
     * @summary Create User Habit
     * @throws FetchError<422, types.UserHabitsCreateApiV5HabitsUserHabitsPostResponse422> Validation Error
     */
    user_habits_create_api_v5_habits_user_habits__post(body: types.UserHabitsCreateApiV5HabitsUserHabitsPostBodyParam): Promise<FetchResponse<201, types.UserHabitsCreateApiV5HabitsUserHabitsPostResponse201>>;
    /**
     * Create Individual User Habit. (Used only for creation. For enabling use
     * user-habit:create
     *
     * @summary Create Individual User Habit
     * @throws FetchError<422, types.UserHabitsCreateIndividualApiV5HabitsUserHabitsIndividualPostResponse422> Validation Error
     */
    user_habits_create_individual_api_v5_habits_user_habits_individual_post(body: types.UserHabitsCreateIndividualApiV5HabitsUserHabitsIndividualPostBodyParam): Promise<FetchResponse<201, types.UserHabitsCreateIndividualApiV5HabitsUserHabitsIndividualPostResponse201>>;
    /**
     * Update the goal of an already existing user habit
     *
     * @summary Update the goal of a user habit
     * @throws FetchError<422, types.UserHabitsUpdateGoalApiV5HabitsUserHabitsGoalPutResponse422> Validation Error
     */
    user_habits_update_goal_api_v5_habits_user_habits_goal_put(body: types.UserHabitsUpdateGoalApiV5HabitsUserHabitsGoalPutBodyParam): Promise<FetchResponse<200, types.UserHabitsUpdateGoalApiV5HabitsUserHabitsGoalPutResponse200>>;
    /**
     * Get all habit logs within the specified time interval
     *
     * @summary Get habit logs
     * @throws FetchError<422, types.HabitGoalsReadApiV5HabitsHabitGoalsGetResponse422> Validation Error
     */
    habit_goals_read_api_v5_habits_habit_goals__get(metadata: types.HabitGoalsReadApiV5HabitsHabitGoalsGetMetadataParam): Promise<FetchResponse<200, types.HabitGoalsReadApiV5HabitsHabitGoalsGetResponse200>>;
    /**
     * Get all the number of times the user completed his goal for each habit
     *
     * @summary Get habit goals achievements
     */
    habit_goals_get_achievements_api_v5_habits_habit_goals_achievements_get(): Promise<FetchResponse<200, types.HabitGoalsGetAchievementsApiV5HabitsHabitGoalsAchievementsGetResponse200>>;
    /**
     * Get all habit logs for the specified habit
     *
     * @summary Get habit logs
     * @throws FetchError<422, types.HabitLogsGetAllApiV5HabitsHabitLogsGetResponse422> Validation Error
     */
    habit_logs_get_all_api_v5_habits_habit_logs__get(metadata: types.HabitLogsGetAllApiV5HabitsHabitLogsGetMetadataParam): Promise<FetchResponse<200, types.HabitLogsGetAllApiV5HabitsHabitLogsGetResponse200>>;
    /**
     * Create habit log. Add this value to the corresponding goal if it exists, if it doesn't
     * exist, it creates a new one.
     *
     * @summary Create habit log
     * @throws FetchError<422, types.HabitLogsCreateApiV5HabitsHabitLogsPostResponse422> Validation Error
     */
    habit_logs_create_api_v5_habits_habit_logs__post(body: types.HabitLogsCreateApiV5HabitsHabitLogsPostBodyParam): Promise<FetchResponse<201, types.HabitLogsCreateApiV5HabitsHabitLogsPostResponse201>>;
    /**
     * Delete Habit log
     *
     * @summary Delete Habit log
     * @throws FetchError<422, types.HabitLogsDeleteApiV5HabitsHabitLogsDeleteResponse422> Validation Error
     */
    habit_logs_delete_api_v5_habits_habit_logs__delete(metadata: types.HabitLogsDeleteApiV5HabitsHabitLogsDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get the specified habit log
     *
     * @summary Get habit log
     * @throws FetchError<422, types.HabitLogsGetOneApiV5HabitsHabitLogsHabitLogIdGetResponse422> Validation Error
     */
    habit_logs_get_one_api_v5_habits_habit_logs__habit_log_id__get(metadata: types.HabitLogsGetOneApiV5HabitsHabitLogsHabitLogIdGetMetadataParam): Promise<FetchResponse<200, types.HabitLogsGetOneApiV5HabitsHabitLogsHabitLogIdGetResponse200>>;
    /**
     * Create multiple habit logs.
     *
     * @summary Create multiple habit logs.
     * @throws FetchError<422, types.HabitLogsCreateMultipleApiV5HabitsHabitLogsMultiplePostResponse422> Validation Error
     */
    habit_logs_create_multiple_api_v5_habits_habit_logs_multiple_post(body: types.HabitLogsCreateMultipleApiV5HabitsHabitLogsMultiplePostBodyParam): Promise<FetchResponse<201, types.HabitLogsCreateMultipleApiV5HabitsHabitLogsMultiplePostResponse201>>;
    /**
     * Get all habit records
     *
     * @summary Get all habit records
     * @throws FetchError<422, types.HabitRecordsReadApiV5HabitsHabitRecordsGetResponse422> Validation Error
     */
    habit_records_read_api_v5_habits_habit_records__get(metadata: types.HabitRecordsReadApiV5HabitsHabitRecordsGetMetadataParam): Promise<FetchResponse<200, types.HabitRecordsReadApiV5HabitsHabitRecordsGetResponse200>>;
    /**
     * Get highest records for the user
     *
     * @summary Get highest records
     */
    habit_records_read_all_api_v5_habits_habit_records_all_get(): Promise<FetchResponse<200, types.HabitRecordsReadAllApiV5HabitsHabitRecordsAllGetResponse200>>;
    /**
     * Get the challenges where the coach is assigned
     *
     * @summary Get the challenges where the coach is assigned
     */
    coaching_get_coach_challenges_api_v5_challenges_coaching_my_challenges_get(): Promise<FetchResponse<200, types.CoachingGetCoachChallengesApiV5ChallengesCoachingMyChallengesGetResponse200>>;
    /**
     * Update the status of the link between the user habit and the challenge. If true, means
     * it's accepted.If false, means that it's rejected and it will be deleted
     *
     * @summary Accept/Reject user habit for challenge
     * @throws FetchError<422, types.CoachingUpdateUserHabitStatusApiV5ChallengesCoachingChallengeUserHabitChallengeUserHabitIdPatchResponse422> Validation Error
     */
    coaching_update_user_habit_status_api_v5_challenges_coaching_challenge_user_habit__challenge_user_habit_id__patch(body: types.CoachingUpdateUserHabitStatusApiV5ChallengesCoachingChallengeUserHabitChallengeUserHabitIdPatchBodyParam, metadata: types.CoachingUpdateUserHabitStatusApiV5ChallengesCoachingChallengeUserHabitChallengeUserHabitIdPatchMetadataParam): Promise<FetchResponse<200, types.CoachingUpdateUserHabitStatusApiV5ChallengesCoachingChallengeUserHabitChallengeUserHabitIdPatchResponse200>>;
    /**
     * Get linked user habits with a challenge for a user
     *
     * @summary Get linked user habits with a challenge for a user
     * @throws FetchError<422, types.CoachingGetLinkedUserHabitsApiV5ChallengesCoachingChallengeChallengeIdUserUserIdUserHabitsGetResponse422> Validation Error
     */
    coaching_get_linked_user_habits_api_v5_challenges_coaching_challenge__challenge_id__user__user_id__user_habits_get(metadata: types.CoachingGetLinkedUserHabitsApiV5ChallengesCoachingChallengeChallengeIdUserUserIdUserHabitsGetMetadataParam): Promise<FetchResponse<200, types.CoachingGetLinkedUserHabitsApiV5ChallengesCoachingChallengeChallengeIdUserUserIdUserHabitsGetResponse200>>;
    /**
     * Create challenge team
     *
     * @summary Create challenge team
     * @throws FetchError<422, types.CoachingCreateChallengeTeamApiV5ChallengesCoachingTeamsPostResponse422> Validation Error
     */
    coaching_create_challenge_team_api_v5_challenges_coaching_teams_post(body: types.CoachingCreateChallengeTeamApiV5ChallengesCoachingTeamsPostBodyParam): Promise<FetchResponse<201, types.CoachingCreateChallengeTeamApiV5ChallengesCoachingTeamsPostResponse201>>;
    /**
     * Update challenge team
     *
     * @summary Update challenge team
     * @throws FetchError<422, types.CoachingUpdateChallengeTeamApiV5ChallengesCoachingTeamsTeamIdPutResponse422> Validation Error
     */
    coaching_update_challenge_team_api_v5_challenges_coaching_teams__team_id__put(body: types.CoachingUpdateChallengeTeamApiV5ChallengesCoachingTeamsTeamIdPutBodyParam, metadata: types.CoachingUpdateChallengeTeamApiV5ChallengesCoachingTeamsTeamIdPutMetadataParam): Promise<FetchResponse<200, types.CoachingUpdateChallengeTeamApiV5ChallengesCoachingTeamsTeamIdPutResponse200>>;
    /**
     * Delete challenge team
     *
     * @summary Delete challenge team
     * @throws FetchError<422, types.CoachingDeleteChallengeTeamApiV5ChallengesCoachingTeamsTeamIdDeleteResponse422> Validation Error
     */
    coaching_delete_challenge_team_api_v5_challenges_coaching_teams__team_id__delete(metadata: types.CoachingDeleteChallengeTeamApiV5ChallengesCoachingTeamsTeamIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Reassign a participant from a team to another within the same challenge
     *
     * @summary Reassign a participant
     * @throws FetchError<422, types.CoachingReassignParticipantApiV5ChallengesCoachingTeamsOldTeamIdReassignPutResponse422> Validation Error
     */
    coaching_reassign_participant_api_v5_challenges_coaching_teams__old_team_id__reassign_put(body: types.CoachingReassignParticipantApiV5ChallengesCoachingTeamsOldTeamIdReassignPutBodyParam, metadata: types.CoachingReassignParticipantApiV5ChallengesCoachingTeamsOldTeamIdReassignPutMetadataParam): Promise<FetchResponse<200, types.CoachingReassignParticipantApiV5ChallengesCoachingTeamsOldTeamIdReassignPutResponse200>>;
    /**
     * Create a participant in challenge team
     *
     * @summary Create a participant in challenge team
     * @throws FetchError<422, types.CoachingCreateParticipantApiV5ChallengesCoachingParticipantsPostResponse422> Validation Error
     */
    coaching_create_participant_api_v5_challenges_coaching_participants_post(body: types.CoachingCreateParticipantApiV5ChallengesCoachingParticipantsPostBodyParam): Promise<FetchResponse<201, types.CoachingCreateParticipantApiV5ChallengesCoachingParticipantsPostResponse201>>;
    /**
     * Delete a participant in challenge team
     *
     * @summary Delete a participant in challenge team
     * @throws FetchError<422, types.CoachingDeleteParticipantApiV5ChallengesCoachingParticipantsParticipantIdDeleteResponse422> Validation Error
     */
    coaching_delete_participant_api_v5_challenges_coaching_participants__participant_id__delete(metadata: types.CoachingDeleteParticipantApiV5ChallengesCoachingParticipantsParticipantIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get all participants of a challenge
     *
     * @summary Get all participants of a challenge
     * @throws FetchError<422, types.CoachingGetParticipantsApiV5ChallengesCoachingParticipantsGetResponse422> Validation Error
     */
    coaching_get_participants_api_v5_challenges_coaching_participants__get(metadata: types.CoachingGetParticipantsApiV5ChallengesCoachingParticipantsGetMetadataParam): Promise<FetchResponse<200, types.CoachingGetParticipantsApiV5ChallengesCoachingParticipantsGetResponse200>>;
    /**
     * Ends the challenge by setting the end date to today
     *
     * @summary Ends challenge
     * @throws FetchError<422, types.CoachingEndChallengeApiV5ChallengesCoachingChallengesChallengeIdEndPutResponse422> Validation Error
     */
    coaching_end_challenge_api_v5_challenges_coaching_challenges__challenge_id__end_put(metadata: types.CoachingEndChallengeApiV5ChallengesCoachingChallengesChallengeIdEndPutMetadataParam): Promise<FetchResponse<200, types.CoachingEndChallengeApiV5ChallengesCoachingChallengesChallengeIdEndPutResponse200>>;
    /**
     * Get all challenges joined by the user
     *
     * @summary Get all challenges joined by the user
     */
    challenges_get_joined_api_v5_challenges_joined_get(): Promise<FetchResponse<200, types.ChallengesGetJoinedApiV5ChallengesJoinedGetResponse200>>;
    /**
     * Get all active global challenges
     *
     * @summary Get all active global challenges
     */
    challenges_get_global_api_v5_challenges_global_get(): Promise<FetchResponse<200, types.ChallengesGetGlobalApiV5ChallengesGlobalGetResponse200>>;
    /**
     * Get challenge leaderboard
     *
     * @summary Get challenge leaderboard
     * @throws FetchError<422, types.ChallengesGetLeaderboardApiV5ChallengesChallengeIdLeaderboardGetResponse422> Validation Error
     */
    challenges_get_leaderboard_api_v5_challenges__challenge_id__leaderboard_get(metadata: types.ChallengesGetLeaderboardApiV5ChallengesChallengeIdLeaderboardGetMetadataParam): Promise<FetchResponse<200, types.ChallengesGetLeaderboardApiV5ChallengesChallengeIdLeaderboardGetResponse200>>;
    /**
     * Get challenge details
     *
     * @summary Get challenge details
     * @throws FetchError<422, types.ChallengesGetOneApiV5ChallengesChallengeIdGetResponse422> Validation Error
     */
    challenges_get_one_api_v5_challenges__challenge_id__get(metadata: types.ChallengesGetOneApiV5ChallengesChallengeIdGetMetadataParam): Promise<FetchResponse<200, types.ChallengesGetOneApiV5ChallengesChallengeIdGetResponse200>>;
    /**
     * Sync challenges leaderboards with the latest data
     *
     * @summary Sync challenges leaderboards with the latest data
     * @throws FetchError<422, types.ChallengesSyncOneLeaderboardApiV5ChallengesChallengeIdSyncLeaderboardPutResponse422> Validation Error
     */
    challenges_sync_one_leaderboard_api_v5_challenges__challenge_id__sync_leaderboard_put(metadata: types.ChallengesSyncOneLeaderboardApiV5ChallengesChallengeIdSyncLeaderboardPutMetadataParam): Promise<FetchResponse<200, types.ChallengesSyncOneLeaderboardApiV5ChallengesChallengeIdSyncLeaderboardPutResponse200>>;
    /**
     * Join challenge
     *
     * @summary Join challenge
     * @throws FetchError<422, types.ChallengesJoinApiV5ChallengesChallengeIdJoinPostResponse422> Validation Error
     */
    challenges_join_api_v5_challenges__challenge_id__join_post(metadata: types.ChallengesJoinApiV5ChallengesChallengeIdJoinPostMetadataParam): Promise<FetchResponse<200, types.ChallengesJoinApiV5ChallengesChallengeIdJoinPostResponse200>>;
    /**
     * Get the linked user habits with a challenge
     *
     * @summary Get the linked user habits with a challenge
     * @throws FetchError<422, types.ChallengesGetLinkedUserHabitsApiV5ChallengesChallengeIdUserHabitsGetResponse422> Validation Error
     */
    challenges_get_linked_user_habits_api_v5_challenges__challenge_id__user_habits_get(metadata: types.ChallengesGetLinkedUserHabitsApiV5ChallengesChallengeIdUserHabitsGetMetadataParam): Promise<FetchResponse<200, types.ChallengesGetLinkedUserHabitsApiV5ChallengesChallengeIdUserHabitsGetResponse200>>;
    /**
     * Link user habit with challenge
     *
     * @summary Link user habit with challenge
     * @throws FetchError<422, types.ChallengesLinkUserHabitsApiV5ChallengesChallengeIdUserHabitsPostResponse422> Validation Error
     */
    challenges_link_user_habits_api_v5_challenges__challenge_id__user_habits_post(body: types.ChallengesLinkUserHabitsApiV5ChallengesChallengeIdUserHabitsPostBodyParam, metadata: types.ChallengesLinkUserHabitsApiV5ChallengesChallengeIdUserHabitsPostMetadataParam): Promise<FetchResponse<201, types.ChallengesLinkUserHabitsApiV5ChallengesChallengeIdUserHabitsPostResponse201>>;
    /**
     * Send a challenge invite to a user
     *
     * @summary Send a challenge invite to a user
     * @throws FetchError<422, types.ChallengesSendInviteApiV5ChallengesChallengeIdSendInviteUserIdPostResponse422> Validation Error
     */
    challenges_send_invite_api_v5_challenges__challenge_id__send_invite__user_id__post(metadata: types.ChallengesSendInviteApiV5ChallengesChallengeIdSendInviteUserIdPostMetadataParam): Promise<FetchResponse<200, types.ChallengesSendInviteApiV5ChallengesChallengeIdSendInviteUserIdPostResponse200>>;
    /**
     * Leave a challenge
     *
     * @summary Leave a challenge
     * @throws FetchError<422, types.ChallengesLeaveApiV5ChallengesChallengeIdLeavePostResponse422> Validation Error
     */
    challenges_leave_api_v5_challenges__challenge_id__leave_post(metadata: types.ChallengesLeaveApiV5ChallengesChallengeIdLeavePostMetadataParam): Promise<FetchResponse<200, types.ChallengesLeaveApiV5ChallengesChallengeIdLeavePostResponse200>>;
    /**
     * Get the list of product from shopify (from vendor 'Pavlok Volts Store') Ignore any
     * product without a valid tag (VoltsCost:XXXXX) XXX a positive int
     *
     * @summary Get products from shopify
     */
    pv_store_get_products_api_v5_pv_store_products_get(): Promise<FetchResponse<200, types.PvStoreGetProductsApiV5PvStoreProductsGetResponse200>>;
    /**
     * Get Current user orders
     *
     * @summary Get orders
     */
    pv_store_get_user_orders_api_v5_pv_store_user_orders_get(): Promise<FetchResponse<200, types.PvStoreGetUserOrdersApiV5PvStoreUserOrdersGetResponse200>>;
    /**
     * Make a shopify order
     *
     * @summary Make a shopify order
     * @throws FetchError<422, types.AuthVoltsStoreApiV5PvStoreRedemptionPostResponse422> Validation Error
     */
    auth_volts_store_api_v5_pv_store_redemption_post(body: types.AuthVoltsStoreApiV5PvStoreRedemptionPostBodyParam): Promise<FetchResponse<200, types.AuthVoltsStoreApiV5PvStoreRedemptionPostResponse200>>;
    /**
     * Get current user sleep datasets
     *
     * @summary Get sleep datasets
     * @throws FetchError<422, types.SleepDatasetsIndexApiV5SleepDatasetGetResponse422> Validation Error
     */
    sleep_datasets_index_api_v5_sleep_dataset__get(metadata?: types.SleepDatasetsIndexApiV5SleepDatasetGetMetadataParam): Promise<FetchResponse<200, types.SleepDatasetsIndexApiV5SleepDatasetGetResponse200>>;
    /**
     * Add sleep dataset to the current user
     *
     * @summary Create sleep dataset
     * @throws FetchError<422, types.SleepDatasetsCreateApiV5SleepDatasetPostResponse422> Validation Error
     */
    sleep_datasets_create_api_v5_sleep_dataset__post(body: types.SleepDatasetsCreateApiV5SleepDatasetPostBodyParam): Promise<FetchResponse<201, types.SleepDatasetsCreateApiV5SleepDatasetPostResponse201>>;
    /**
     * Get current user sleep dataset by id
     *
     * @summary Sleep-Datasets:Get-One
     * @throws FetchError<422, types.SleepDatasetsGetOneApiV5SleepDatasetSessionSleepDatasetIdGetResponse422> Validation Error
     */
    sleep_datasets_get_one_api_v5_sleep_dataset_session__sleep_dataset_id__get(metadata: types.SleepDatasetsGetOneApiV5SleepDatasetSessionSleepDatasetIdGetMetadataParam): Promise<FetchResponse<200, types.SleepDatasetsGetOneApiV5SleepDatasetSessionSleepDatasetIdGetResponse200>>;
    /**
     * Delete sleep dataset to the current user
     *
     * @summary Delete sleep dataset
     * @throws FetchError<422, types.SleepDatasetsDeleteApiV5SleepDatasetSleepDatasetIdDeleteResponse422> Validation Error
     */
    sleep_datasets_delete_api_v5_sleep_dataset__sleep_dataset_id__delete(metadata: types.SleepDatasetsDeleteApiV5SleepDatasetSleepDatasetIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get current user notifications
     *
     * @summary Notifications:Index
     * @throws FetchError<422, types.NotificationsIndexApiV5NotificationsGetResponse422> Validation Error
     */
    notifications_index_api_v5_notifications__get(metadata?: types.NotificationsIndexApiV5NotificationsGetMetadataParam): Promise<FetchResponse<200, types.NotificationsIndexApiV5NotificationsGetResponse200>>;
    /**
     * Get new notifications since the provided timestamp
     *
     * @summary Notifications:New
     * @throws FetchError<422, types.NotificationsNewApiV5NotificationsNewGetResponse422> Validation Error
     */
    notifications_new_api_v5_notifications_new__get(metadata: types.NotificationsNewApiV5NotificationsNewGetMetadataParam): Promise<FetchResponse<200, types.NotificationsNewApiV5NotificationsNewGetResponse200>>;
    /**
     * Get current user notifications
     *
     * @summary Notifications:Bottom Sheets
     */
    notifications_bottom_sheets_api_v5_notifications_bottom_sheets__get(): Promise<FetchResponse<200, types.NotificationsBottomSheetsApiV5NotificationsBottomSheetsGetResponse200>>;
    /**
     * Get notification by id
     *
     * @summary Notifications:Get-One
     * @throws FetchError<422, types.NotificationsGetOneApiV5NotificationsGetOneNotificationIdGetResponse422> Validation Error
     */
    notifications_get_one_api_v5_notifications_get_one__notification_id__get(metadata: types.NotificationsGetOneApiV5NotificationsGetOneNotificationIdGetMetadataParam): Promise<FetchResponse<200, types.NotificationsGetOneApiV5NotificationsGetOneNotificationIdGetResponse200>>;
    /**
     * Send a push notification
     *
     * @summary Notifications:Create
     * @throws FetchError<422, types.NotificationsCreateApiV5NotificationsSendPushNotificationPostResponse422> Validation Error
     */
    notifications_create_api_v5_notifications_send_push_notification_post(body: types.NotificationsCreateApiV5NotificationsSendPushNotificationPostBodyParam): Promise<FetchResponse<200, types.NotificationsCreateApiV5NotificationsSendPushNotificationPostResponse200>>;
    /**
     * Mark all unread notifications as read of the user
     *
     * @summary Notifications:Mark-All-Read
     */
    notifications_mark_all_read_api_v5_notifications_mark_all_read_put(): Promise<FetchResponse<200, types.NotificationsMarkAllReadApiV5NotificationsMarkAllReadPutResponse200>>;
    /**
     * Send a push notification
     *
     * @summary Notifications:Update
     * @throws FetchError<422, types.NotificationsUpdateApiV5NotificationsNotificationIdPutResponse422> Validation Error
     */
    notifications_update_api_v5_notifications__notification_id__put(body: types.NotificationsUpdateApiV5NotificationsNotificationIdPutBodyParam, metadata: types.NotificationsUpdateApiV5NotificationsNotificationIdPutMetadataParam): Promise<FetchResponse<200, types.NotificationsUpdateApiV5NotificationsNotificationIdPutResponse200>>;
    /**
     * Get current user notifications
     *
     * @summary Notifications:Delete
     * @throws FetchError<422, types.NotificationsDeleteApiV5NotificationsNotificationIdDeleteResponse422> Validation Error
     */
    notifications_delete_api_v5_notifications__notification_id__delete(metadata: types.NotificationsDeleteApiV5NotificationsNotificationIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Create webhook. Category value must be one of the predefined values for webhooks'
     * categories
     *
     * @summary Create webhook
     * @throws FetchError<422, types.WebhooksCreateApiV5WebhooksPostResponse422> Validation Error
     */
    webhooks_create_api_v5_webhooks_post(body: types.WebhooksCreateApiV5WebhooksPostBodyParam): Promise<FetchResponse<201, types.WebhooksCreateApiV5WebhooksPostResponse201>>;
    /**
     * Execute all user's webhooks of the specified category. Use case example: When the user
     * receives a call on his mobile, the mobile app will send a request to this endpoint with
     * the call data, then this function will send a request with the call data to all the
     * webhooks of this user of the specified category.
     *
     * @summary Execute webhook
     * @throws FetchError<422, types.WebhooksExecuteApiV5WebhooksExecutePostResponse422> Validation Error
     */
    webhooks_execute_api_v5_webhooks_execute_post(body: types.WebhooksExecuteApiV5WebhooksExecutePostBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Deletes the specified webhook.
     *
     * @summary Delete webhook
     * @throws FetchError<422, types.WebhooksDeleteApiV5WebhooksWebhookIdDeleteResponse422> Validation Error
     */
    webhooks_delete_api_v5_webhooks__webhook_id__delete(metadata: types.WebhooksDeleteApiV5WebhooksWebhookIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Update phone device if exist else insert new phone device.A device is identified by
     * (user_id, hardware_identifier)
     *
     * @summary Upsert phone device.
     * @throws FetchError<422, types.PhoneDevicesUpsertApiV5PhoneDevicesPutResponse422> Validation Error
     */
    phone_devices_upsert_api_v5_phone_devices__put(body: types.PhoneDevicesUpsertApiV5PhoneDevicesPutBodyParam): Promise<FetchResponse<200, types.PhoneDevicesUpsertApiV5PhoneDevicesPutResponse200>>;
    /**
     * Remove phone device: delete the instance from the phone devices table and also the
     * channels table
     *
     * @summary Remove phone device
     * @throws FetchError<422, types.PhoneDevicesDeleteApiV5PhoneDevicesDeleteResponse422> Validation Error
     */
    phone_devices_delete_api_v5_phone_devices__delete(metadata: types.PhoneDevicesDeleteApiV5PhoneDevicesDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Create user feedback
     *
     * @summary Create user feedback
     * @throws FetchError<422, types.FeedbacksCreateApiV5FeedbacksPostResponse422> Validation Error
     */
    feedbacks_create_api_v5_feedbacks__post(body: types.FeedbacksCreateApiV5FeedbacksPostBodyParam): Promise<FetchResponse<200, types.FeedbacksCreateApiV5FeedbacksPostResponse200>>;
    /**
     * Create a stimulus and send to current user
     *
     * @summary Create and send a stimulus
     * @throws FetchError<422, types.StimulusCreateApiV5StimulusSendPostResponse422> Validation Error
     */
    stimulus_create_api_v5_stimulus_send_post(body: types.StimulusCreateApiV5StimulusSendPostBodyParam): Promise<FetchResponse<200, types.StimulusCreateApiV5StimulusSendPostResponse200>>;
    /**
     * Get all stimulus sent to current user
     *
     * @summary Get all stimulus
     */
    stimulus_get_stimulus_current_user_api_v5_stimulus_sent_me_get(): Promise<FetchResponse<200, types.StimulusGetStimulusCurrentUserApiV5StimulusSentMeGetResponse200>>;
    /**
     * Get Stimulus by id for the current user
     *
     * @summary Get Stimulus by id
     * @throws FetchError<422, types.StimulusGetByIdApiV5StimulusStimulusIdGetResponse422> Validation Error
     */
    stimulus_get_by_id_api_v5_stimulus__stimulus_id__get(metadata: types.StimulusGetByIdApiV5StimulusStimulusIdGetMetadataParam): Promise<FetchResponse<200, types.StimulusGetByIdApiV5StimulusStimulusIdGetResponse200>>;
    /**
     * Delete stimulus by id
     *
     * @summary Delete stimulus
     * @throws FetchError<422, types.StimulusDeleteApiV5StimulusStimulusIdDeleteResponse422> Validation Error
     */
    stimulus_delete_api_v5_stimulus__stimulus_id__delete(metadata: types.StimulusDeleteApiV5StimulusStimulusIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get current user volts
     *
     */
    wallets_get_current_user_volts_api_v5_wallets_volts_get(): Promise<FetchResponse<200, types.WalletsGetCurrentUserVoltsApiV5WalletsVoltsGetResponse200>>;
    /**
     * Send volts to another user
     *
     * @summary Send volts
     * @throws FetchError<422, types.WalletsSendVoltsApiV5WalletsSendVoltsPostResponse422> Validation Error
     */
    wallets_send_volts_api_v5_wallets_send_volts_post(body: types.WalletsSendVoltsApiV5WalletsSendVoltsPostBodyParam): Promise<FetchResponse<200, types.WalletsSendVoltsApiV5WalletsSendVoltsPostResponse200>>;
    /**
     * Get policy by id
     *
     * @summary Get policy by id
     * @throws FetchError<422, types.PoliciesGetPolicyByIdApiV5PoliciesPolicyIdGetResponse422> Validation Error
     */
    policies_get_policy_by_id_api_v5_policies__policy_id__get(metadata: types.PoliciesGetPolicyByIdApiV5PoliciesPolicyIdGetMetadataParam): Promise<FetchResponse<200, types.PoliciesGetPolicyByIdApiV5PoliciesPolicyIdGetResponse200>>;
    /**
     * Get policies
     *
     * @summary Get policies
     */
    policies_get_policies_api_v5_policies__get(): Promise<FetchResponse<200, types.PoliciesGetPoliciesApiV5PoliciesGetResponse200>>;
    /**
     * Create device log.
     *
     * @summary Create device log
     * @throws FetchError<422, types.DeviceLogsCreateApiV5DeviceLogsPostResponse422> Validation Error
     */
    device_logs_create_api_v5_device_logs__post(body: types.DeviceLogsCreateApiV5DeviceLogsPostBodyParam): Promise<FetchResponse<201, types.DeviceLogsCreateApiV5DeviceLogsPostResponse201>>;
    /**
     * Create Diagnostic log file.
     *
     * @summary Create diagnostic logs file
     * @throws FetchError<422, types.DiagnosticLogsCreateApiV5DiagnosticLogsPostResponse422> Validation Error
     */
    diagnostic_logs_create_api_v5_diagnostic_logs__post(body: types.DiagnosticLogsCreateApiV5DiagnosticLogsPostBodyParam): Promise<FetchResponse<201, types.DiagnosticLogsCreateApiV5DiagnosticLogsPostResponse201>>;
    /**
     * Get latest firmware
     *
     * @summary Get latest firmware
     * @throws FetchError<422, types.FirmwaresLatestApiV5FirmwaresLatestGetResponse422> Validation Error
     */
    firmwares_latest_api_v5_firmwares_latest_get(metadata: types.FirmwaresLatestApiV5FirmwaresLatestGetMetadataParam): Promise<FetchResponse<200, types.FirmwaresLatestApiV5FirmwaresLatestGetResponse200>>;
    /**
     * Get the latest firmware for the given hardware version
     *
     * @summary Get the latest firmware for the given hardware version
     * @throws FetchError<422, types.FirmwaresLatestForHardwareApiV5FirmwaresLatestForHardwareGetResponse422> Validation Error
     */
    firmwares_latest_for_hardware_api_v5_firmwares_latest_for_hardware_get(metadata: types.FirmwaresLatestForHardwareApiV5FirmwaresLatestForHardwareGetMetadataParam): Promise<FetchResponse<200, types.FirmwaresLatestForHardwareApiV5FirmwaresLatestForHardwareGetResponse200>>;
    /**
     * Get user's devices
     *
     * @summary Get user's devices
     */
    user_devices_get_list_api_v5_user_devices__get(): Promise<FetchResponse<200, types.UserDevicesGetListApiV5UserDevicesGetResponse200>>;
    /**
     * Upsert user device.
     *
     * @summary Upsert user device
     * @throws FetchError<422, types.UserDevicesUpsertApiV5UserDevicesPostResponse422> Validation Error
     */
    user_devices_upsert_api_v5_user_devices__post(body: types.UserDevicesUpsertApiV5UserDevicesPostBodyParam): Promise<FetchResponse<201, types.UserDevicesUpsertApiV5UserDevicesPostResponse201>>;
    /**
     * Get all user's flags
     *
     * @summary Get all user's flags
     */
    user_flags_read_api_v5_user_flags__get(): Promise<FetchResponse<200, types.UserFlagsReadApiV5UserFlagsGetResponse200>>;
    /**
     * Create user flag
     *
     * @summary Create user flag
     * @throws FetchError<422, types.UserFlagsCreateApiV5UserFlagsPostResponse422> Validation Error
     */
    user_flags_create_api_v5_user_flags__post(body: types.UserFlagsCreateApiV5UserFlagsPostBodyParam): Promise<FetchResponse<201, types.UserFlagsCreateApiV5UserFlagsPostResponse201>>;
    /**
     * Delete user flag
     *
     * @summary Delete user flag
     * @throws FetchError<422, types.UserFlagsDeleteApiV5UserFlagsDeleteResponse422> Validation Error
     */
    user_flags_delete_api_v5_user_flags__delete(metadata: types.UserFlagsDeleteApiV5UserFlagsDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get live and not expired banners of the specified app that the actual user can see (His
     * specific banners + banners that are not specific to any user + included in the audience
     *
     * @summary Get banners
     * @throws FetchError<422, types.BannersGetBannersApiV5BannersGetResponse422> Validation Error
     */
    banners_get_banners_api_v5_banners__get(metadata: types.BannersGetBannersApiV5BannersGetMetadataParam): Promise<FetchResponse<200, types.BannersGetBannersApiV5BannersGetResponse200>>;
    /**
     * Hide banner by id
     *
     * @summary Hide banner
     * @throws FetchError<422, types.BannersHideBannerApiV5BannersBannerIdHidePutResponse422> Validation Error
     */
    banners_hide_banner_api_v5_banners__banner_id__hide_put(metadata: types.BannersHideBannerApiV5BannersBannerIdHidePutMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get list of steps count for the given time interval
     *
     * @summary Get list of steps count
     * @throws FetchError<422, types.StepsCountsReadApiV5StepsCountsGetResponse422> Validation Error
     */
    steps_counts_read_api_v5_steps_counts__get(metadata: types.StepsCountsReadApiV5StepsCountsGetMetadataParam): Promise<FetchResponse<200, types.StepsCountsReadApiV5StepsCountsGetResponse200>>;
    /**
     * Create steps count
     *
     * @summary Create steps count
     * @throws FetchError<422, types.StepsCountsCreateApiV5StepsCountsPostResponse422> Validation Error
     */
    steps_counts_create_api_v5_steps_counts__post(body: types.StepsCountsCreateApiV5StepsCountsPostBodyParam): Promise<FetchResponse<201, types.StepsCountsCreateApiV5StepsCountsPostResponse201>>;
    /**
     * Send a friendship request
     *
     * @summary Send a friendship request
     * @throws FetchError<422, types.FriendshipsSendRequestApiV5FriendshipsPostResponse422> Validation Error
     */
    friendships_send_request_api_v5_friendships__post(body: types.FriendshipsSendRequestApiV5FriendshipsPostBodyParam): Promise<FetchResponse<201, types.FriendshipsSendRequestApiV5FriendshipsPostResponse201>>;
    /**
     * Get current user sent friendship requests
     *
     * @summary Get current user sent friendship requests
     */
    friendships_sent_requests_api_v5_friendships_sent_requests_get(): Promise<FetchResponse<200, types.FriendshipsSentRequestsApiV5FriendshipsSentRequestsGetResponse200>>;
    /**
     * Get current user blocked friendship requests
     *
     * @summary Get blocked friendship requests
     */
    friendships_blocked_requests_api_v5_friendships_blocked_requests_get(): Promise<FetchResponse<200, types.FriendshipsBlockedRequestsApiV5FriendshipsBlockedRequestsGetResponse200>>;
    /**
     * Get current user received friendship requests
     *
     * @summary Get received friendship requests
     */
    friendships_received_requests_api_v5_friendships_received_requests_get(): Promise<FetchResponse<200, types.FriendshipsReceivedRequestsApiV5FriendshipsReceivedRequestsGetResponse200>>;
    /**
     * Accept a friendship request
     *
     * @summary Accept a friendship request
     * @throws FetchError<422, types.FriendshipsAcceptRequestApiV5FriendshipsAcceptRequestPutResponse422> Validation Error
     */
    friendships_accept_request_api_v5_friendships_accept_request_put(body: types.FriendshipsAcceptRequestApiV5FriendshipsAcceptRequestPutBodyParam): Promise<FetchResponse<200, types.FriendshipsAcceptRequestApiV5FriendshipsAcceptRequestPutResponse200>>;
    /**
     * Reject friendship request
     *
     * @summary Reject friendship request
     * @throws FetchError<422, types.FriendshipsRejectRequestApiV5FriendshipsRejectRequestPutResponse422> Validation Error
     */
    friendships_reject_request_api_v5_friendships_reject_request_put(body: types.FriendshipsRejectRequestApiV5FriendshipsRejectRequestPutBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Cancel friendship request
     *
     * @summary Cancel friendship request
     * @throws FetchError<422, types.FriendshipsCancelRequestApiV5FriendshipsCancelRequestPutResponse422> Validation Error
     */
    friendships_cancel_request_api_v5_friendships_cancel_request_put(body: types.FriendshipsCancelRequestApiV5FriendshipsCancelRequestPutBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Block friendship request
     *
     * @summary Block friendship request
     * @throws FetchError<422, types.FriendshipsBlockRequestApiV5FriendshipsBlockRequestPutResponse422> Validation Error
     */
    friendships_block_request_api_v5_friendships_block_request_put(body: types.FriendshipsBlockRequestApiV5FriendshipsBlockRequestPutBodyParam): Promise<FetchResponse<200, types.FriendshipsBlockRequestApiV5FriendshipsBlockRequestPutResponse200>>;
    /**
     * Unblock received friendship request
     *
     * @summary Unblock received friendship request
     * @throws FetchError<422, types.FriendshipsUnblockRequestApiV5FriendshipsUnblockRequestPutResponse422> Validation Error
     */
    friendships_unblock_request_api_v5_friendships_unblock_request_put(body: types.FriendshipsUnblockRequestApiV5FriendshipsUnblockRequestPutBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Remove friend
     *
     * @summary Remove friend
     * @throws FetchError<422, types.FriendshipsRemoveFriendApiV5FriendshipsRemoveFriendPutResponse422> Validation Error
     */
    friendships_remove_friend_api_v5_friendships_remove_friend_put(body: types.FriendshipsRemoveFriendApiV5FriendshipsRemoveFriendPutBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get current user friends
     *
     * @summary Get friends
     */
    friendships_get_friends_api_v5_friendships_get_friends_get(): Promise<FetchResponse<200, types.FriendshipsGetFriendsApiV5FriendshipsGetFriendsGetResponse200>>;
    /**
     * Get current user friend by friend_id
     *
     * @summary Get friend by friend_id
     * @throws FetchError<422, types.FriendshipsGetFriendshipApiV5FriendshipsGetFriendshipGetResponse422> Validation Error
     */
    friendships_get_friendship_api_v5_friendships_get_friendship_get(body: types.FriendshipsGetFriendshipApiV5FriendshipsGetFriendshipGetBodyParam): Promise<FetchResponse<200, types.FriendshipsGetFriendshipApiV5FriendshipsGetFriendshipGetResponse200>>;
    /**
     * Get all badges
     *
     * @summary Get all badges
     */
    badges_get_all_api_v5_badges__get(): Promise<FetchResponse<200, types.BadgesGetAllApiV5BadgesGetResponse200>>;
    /**
     * Get badge by id
     *
     * @summary Get badge by id
     * @throws FetchError<422, types.BadgesGetByIdApiV5BadgesGetOneBadgeIdGetResponse422> Validation Error
     */
    badges_get_by_id_api_v5_badges_get_one__badge_id__get(metadata: types.BadgesGetByIdApiV5BadgesGetOneBadgeIdGetMetadataParam): Promise<FetchResponse<200, types.BadgesGetByIdApiV5BadgesGetOneBadgeIdGetResponse200>>;
    /**
     * Get user badges
     *
     * @summary Get user badges
     */
    badges_get_user_badges_api_v5_badges_get_user_badges_get(): Promise<FetchResponse<200, types.BadgesGetUserBadgesApiV5BadgesGetUserBadgesGetResponse200>>;
    /**
     * Get user badge
     *
     * @summary Get user badge
     * @throws FetchError<422, types.BadgesGetUserBadgeApiV5BadgesGetUserBadgeBadgeIdGetResponse422> Validation Error
     */
    badges_get_user_badge_api_v5_badges_get_user_badge__badge_id__get(metadata: types.BadgesGetUserBadgeApiV5BadgesGetUserBadgeBadgeIdGetMetadataParam): Promise<FetchResponse<200, types.BadgesGetUserBadgeApiV5BadgesGetUserBadgeBadgeIdGetResponse200>>;
    /**
     * Add badge to user
     *
     * @summary Add badge to user
     * @throws FetchError<422, types.BadgesAddUserBadgeApiV5BadgesAddUserBadgePostResponse422> Validation Error
     */
    badges_add_user_badge_api_v5_badges_add_user_badge_post(body: types.BadgesAddUserBadgeApiV5BadgesAddUserBadgePostBodyParam): Promise<FetchResponse<201, types.BadgesAddUserBadgeApiV5BadgesAddUserBadgePostResponse201>>;
    /**
     * Send poke
     *
     * @summary Send poke
     * @throws FetchError<422, types.PokePermissionsSendPokeApiV5PokesSendUserFriendIdPostResponse422> Validation Error
     */
    poke_permissions_send_poke_api_v5_pokes_send_user__friend_id__post(body: types.PokePermissionsSendPokeApiV5PokesSendUserFriendIdPostBodyParam, metadata: types.PokePermissionsSendPokeApiV5PokesSendUserFriendIdPostMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get user poke permissions given by current user
     *
     * @summary Poke-Permissions:Get-User-Poke-Permissions
     */
    poke_permissions_get_user_poke_permissions_api_v5_poke_permissions__get(): Promise<FetchResponse<200, types.PokePermissionsGetUserPokePermissionsApiV5PokePermissionsGetResponse200>>;
    /**
     * Give a user a poke permission
     *
     * @summary Give a user poke permissions
     * @throws FetchError<422, types.PokePermissionsCreatePokePermissionApiV5PokePermissionsPostResponse422> Validation Error
     */
    poke_permissions_create_poke_permission_api_v5_poke_permissions__post(body: types.PokePermissionsCreatePokePermissionApiV5PokePermissionsPostBodyParam): Promise<FetchResponse<201, types.PokePermissionsCreatePokePermissionApiV5PokePermissionsPostResponse201>>;
    /**
     * Get poke permissions by id for current user
     *
     * @summary Poke-Permissions:Get-Poke-Permission-By-Id
     * @throws FetchError<422, types.PokePermissionsGetPokePermissionByIdApiV5PokePermissionsPokePermissionIdGetResponse422> Validation Error
     */
    poke_permissions_get_poke_permission_by_id_api_v5_poke_permissions__poke_permission_id__get(metadata: types.PokePermissionsGetPokePermissionByIdApiV5PokePermissionsPokePermissionIdGetMetadataParam): Promise<FetchResponse<200, types.PokePermissionsGetPokePermissionByIdApiV5PokePermissionsPokePermissionIdGetResponse200>>;
    /**
     * Update a poke permission
     *
     * @summary Update a poke permission
     * @throws FetchError<422, types.PokePermissionsUpdatePokePermissionApiV5PokePermissionsPokePermissionIdPutResponse422> Validation Error
     */
    poke_permissions_update_poke_permission_api_v5_poke_permissions__poke_permission_id__put(body: types.PokePermissionsUpdatePokePermissionApiV5PokePermissionsPokePermissionIdPutBodyParam, metadata: types.PokePermissionsUpdatePokePermissionApiV5PokePermissionsPokePermissionIdPutMetadataParam): Promise<FetchResponse<200, types.PokePermissionsUpdatePokePermissionApiV5PokePermissionsPokePermissionIdPutResponse200>>;
    /**
     * Delete a poke permission
     *
     * @summary Poke-Permissions:Delete-Poke-Permission
     * @throws FetchError<422, types.PokePermissionsDeletePokePermissionApiV5PokePermissionsPokePermissionIdDeleteResponse422> Validation Error
     */
    poke_permissions_delete_poke_permission_api_v5_poke_permissions__poke_permission_id__delete(metadata: types.PokePermissionsDeletePokePermissionApiV5PokePermissionsPokePermissionIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get poke permissions that was given to current user
     *
     * @summary Poke-Permissions:Get-Received-Poke-Permissions
     */
    poke_permissions_get_received_poke_permissions_api_v5_poke_permissions_received_get(): Promise<FetchResponse<200, types.PokePermissionsGetReceivedPokePermissionsApiV5PokePermissionsReceivedGetResponse200>>;
    /**
     * Get poke permission between current user and another user
     *
     * @summary Poke-Permissions:Get-Poke-Permission-By-Friend-Id
     * @throws FetchError<422, types.PokePermissionsGetPokePermissionByFriendIdApiV5PokePermissionsFriendFriendIdGetResponse422> Validation Error
     */
    poke_permissions_get_poke_permission_by_friend_id_api_v5_poke_permissions_friend__friend_id__get(metadata: types.PokePermissionsGetPokePermissionByFriendIdApiV5PokePermissionsFriendFriendIdGetMetadataParam): Promise<FetchResponse<200, types.PokePermissionsGetPokePermissionByFriendIdApiV5PokePermissionsFriendFriendIdGetResponse200>>;
    /**
     * Get in app subscription route
     *
     * @summary Get active in app subscriptions
     */
    in_app_subscription_get_active_subscriptions_api_v5_InApp_Subscriptions__get(): Promise<FetchResponse<200, types.InAppSubscriptionGetActiveSubscriptionsApiV5InAppSubscriptionsGetResponse200>>;
    /**
     * Create in app subscriptions
     *
     * @throws FetchError<422, types.InAppSubscriptionAppStoreCreateApiV5InAppSubscriptionsAppStorePostResponse422> Validation Error
     */
    in_app_subscription_app_store_create_api_v5_InApp_Subscriptions_app_store_post(body: types.InAppSubscriptionAppStoreCreateApiV5InAppSubscriptionsAppStorePostBodyParam): Promise<FetchResponse<201, types.InAppSubscriptionAppStoreCreateApiV5InAppSubscriptionsAppStorePostResponse201>>;
    /**
     * Get play store in app subscriptions
     *
     * @throws FetchError<422, types.InAppSubscriptionPlayStoreCreateApiV5InAppSubscriptionsPlayStorePostResponse422> Validation Error
     */
    in_app_subscription_play_store_create_api_v5_InApp_Subscriptions_play_store_post(body: types.InAppSubscriptionPlayStoreCreateApiV5InAppSubscriptionsPlayStorePostBodyParam): Promise<FetchResponse<201, types.InAppSubscriptionPlayStoreCreateApiV5InAppSubscriptionsPlayStorePostResponse201>>;
    /**
     * Add stripe subscription to in app subscriptions
     *
     * @summary Create play sotre in app subscription
     * @throws FetchError<422, types.InAppSubscriptionStripeAddApiV5InAppSubscriptionsStripePostResponse422> Validation Error
     */
    in_app_subscription_stripe_add_api_v5_InApp_Subscriptions_stripe_post(body: types.InAppSubscriptionStripeAddApiV5InAppSubscriptionsStripePostBodyParam): Promise<FetchResponse<201, types.InAppSubscriptionStripeAddApiV5InAppSubscriptionsStripePostResponse201>>;
    /**
     * Cron job to check the subscription
     *
     * @summary Verify all stripe subscriptions
     */
    in_app_subscription_stripe_verify_all_api_v5_InApp_Subscriptions_stripe_verify_subscriptions_get(): Promise<FetchResponse<200, types.InAppSubscriptionStripeVerifyAllApiV5InAppSubscriptionsStripeVerifySubscriptionsGetResponse200>>;
    /**
     * Get stripe subscription by id
     *
     * @summary Get stripe subscription by id
     * @throws FetchError<422, types.InAppSubscriptionStripeGetByIdApiV5InAppSubscriptionsStripeSubscriptionIdGetResponse422> Validation Error
     */
    in_app_subscription_stripe_get_by_id_api_v5_InApp_Subscriptions_stripe__subscription_id__get(metadata: types.InAppSubscriptionStripeGetByIdApiV5InAppSubscriptionsStripeSubscriptionIdGetMetadataParam): Promise<FetchResponse<200, types.InAppSubscriptionStripeGetByIdApiV5InAppSubscriptionsStripeSubscriptionIdGetResponse200>>;
    /**
     * Get in app subscription groups route
     *
     * @summary Get all subscriptions groups
     */
    in_app_subscriptions_groups_get_all_api_v5_InApp_Subscriptions_groups__get(): Promise<FetchResponse<200, types.InAppSubscriptionsGroupsGetAllApiV5InAppSubscriptionsGroupsGetResponse200>>;
    /**
     * Get in app subscription groups route
     *
     * @summary Get subscription group by name
     * @throws FetchError<422, types.InAppSubscriptionsGroupsGetByNameApiV5InAppSubscriptionsGroupsGroupNameGetResponse422> Validation Error
     */
    in_app_subscriptions_groups_get_by_name_api_v5_InApp_Subscriptions_groups__group_name__get(metadata: types.InAppSubscriptionsGroupsGetByNameApiV5InAppSubscriptionsGroupsGroupNameGetMetadataParam): Promise<FetchResponse<200, types.InAppSubscriptionsGroupsGetByNameApiV5InAppSubscriptionsGroupsGroupNameGetResponse200>>;
    /**
     * Get all the alarms of the current user
     *
     * @summary Get all the alarms of the current user
     */
    alarms_get_all_api_v5_alarms__get(): Promise<FetchResponse<200, types.AlarmsGetAllApiV5AlarmsGetResponse200>>;
    /**
     * Create Alarm
     *
     * @summary Create an alarm
     * @throws FetchError<422, types.AlarmsCreateApiV5AlarmsPostResponse422> Validation Error
     */
    alarms_create_api_v5_alarms__post(body: types.AlarmsCreateApiV5AlarmsPostBodyParam): Promise<FetchResponse<201, types.AlarmsCreateApiV5AlarmsPostResponse201>>;
    /**
     * Get one alarm by id
     *
     * @summary Get one alarm by id
     * @throws FetchError<422, types.AlarmsGetOneApiV5AlarmsAlarmIdGetResponse422> Validation Error
     */
    alarms_get_one_api_v5_alarms__alarm_id__get(metadata: types.AlarmsGetOneApiV5AlarmsAlarmIdGetMetadataParam): Promise<FetchResponse<200, types.AlarmsGetOneApiV5AlarmsAlarmIdGetResponse200>>;
    /**
     * Update Alarm
     *
     * @summary Update an alarm
     * @throws FetchError<422, types.AlarmsUpdateApiV5AlarmsAlarmIdPutResponse422> Validation Error
     */
    alarms_update_api_v5_alarms__alarm_id__put(body: types.AlarmsUpdateApiV5AlarmsAlarmIdPutBodyParam, metadata: types.AlarmsUpdateApiV5AlarmsAlarmIdPutMetadataParam): Promise<FetchResponse<200, types.AlarmsUpdateApiV5AlarmsAlarmIdPutResponse200>>;
    /**
     * Delete Alarm
     *
     * @summary Delete an alarm by id
     * @throws FetchError<422, types.AlarmsDeleteApiV5AlarmsAlarmIdDeleteResponse422> Validation Error
     */
    alarms_delete_api_v5_alarms__alarm_id__delete(metadata: types.AlarmsDeleteApiV5AlarmsAlarmIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get battery issues
     *
     * @summary Get battery issues
     * @throws FetchError<422, types.BatteryIssuesGetBatteryIssuesApiV5BatteryIssuesGetResponse422> Validation Error
     */
    battery_issues_get_battery_issues_api_v5_battery_issues__get(metadata: types.BatteryIssuesGetBatteryIssuesApiV5BatteryIssuesGetMetadataParam): Promise<FetchResponse<200, types.BatteryIssuesGetBatteryIssuesApiV5BatteryIssuesGetResponse200>>;
    /**
     * Get database healtcheck
     *
     * @summary Database healthcheck
     */
    healtcheck_status_api_v5_healtcheck__get(): Promise<FetchResponse<200, types.HealtcheckStatusApiV5HealtcheckGetResponse200>>;
    /**
     * Stripe webhook
     *
     * @summary Stripe webhook
     * @throws FetchError<422, types.StripeWebhookApiV5StripeWebhookPostResponse422> Validation Error
     */
    stripe_webhook_api_v5_stripe_webhook_post(metadata?: types.StripeWebhookApiV5StripeWebhookPostMetadataParam): Promise<FetchResponse<200, types.StripeWebhookApiV5StripeWebhookPostResponse200>>;
    /**
     * Readme auth webhook
     *
     * @summary Readme auth webhook
     */
    readme_webhook_api_v5_readme_webhook_post(): Promise<FetchResponse<200, types.ReadmeWebhookApiV5ReadmeWebhookPostResponse200>>;
    /**
     * Revenue cat webhook
     *
     * @summary Revenue cat webhook
     */
    revenue_cat_webhook_api_v5_revenue_cat__post(): Promise<FetchResponse<200, types.RevenueCatWebhookApiV5RevenueCatPostResponse200>>;
    /**
     * Get all threads
     *
     * @summary Get all chat threads
     */
    ai_chat_threads_get_all_api_v5_ai_chat_threads__get(): Promise<FetchResponse<200, types.AiChatThreadsGetAllApiV5AiChatThreadsGetResponse200>>;
    /**
     * Create a chat thread
     *
     * @throws FetchError<422, types.AiChatThreadsCreateApiV5AiChatThreadsPostResponse422> Validation Error
     */
    ai_chat_threads_create_api_v5_ai_chat_threads__post(body: types.AiChatThreadsCreateApiV5AiChatThreadsPostBodyParam): Promise<FetchResponse<201, types.AiChatThreadsCreateApiV5AiChatThreadsPostResponse201>>;
    /**
     * Get a single chat thread
     *
     * @throws FetchError<422, types.AiChatThreadsGetOneApiV5AiChatThreadsThreadIdGetResponse422> Validation Error
     */
    ai_chat_threads_get_one_api_v5_ai_chat_threads__thread_id__get(metadata: types.AiChatThreadsGetOneApiV5AiChatThreadsThreadIdGetMetadataParam): Promise<FetchResponse<200, types.AiChatThreadsGetOneApiV5AiChatThreadsThreadIdGetResponse200>>;
    /**
     * Update a chat thread
     *
     * @throws FetchError<422, types.AiChatThreadsUpdateApiV5AiChatThreadsThreadIdPutResponse422> Validation Error
     */
    ai_chat_threads_update_api_v5_ai_chat_threads__thread_id__put(body: types.AiChatThreadsUpdateApiV5AiChatThreadsThreadIdPutBodyParam, metadata: types.AiChatThreadsUpdateApiV5AiChatThreadsThreadIdPutMetadataParam): Promise<FetchResponse<200, types.AiChatThreadsUpdateApiV5AiChatThreadsThreadIdPutResponse200>>;
    /**
     * Delete a chat thread
     *
     * @throws FetchError<422, types.AiChatThreadsDeleteApiV5AiChatThreadsThreadIdDeleteResponse422> Validation Error
     */
    ai_chat_threads_delete_api_v5_ai_chat_threads__thread_id__delete(metadata: types.AiChatThreadsDeleteApiV5AiChatThreadsThreadIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get all messages within a specific thread.
     *
     * @summary Get all chat messages in a thread
     * @throws FetchError<422, types.AiChatMessagesGetAllApiV5AiChatMessagesGetResponse422> Validation Error
     */
    ai_chat_messages_get_all_api_v5_ai_chat_messages__get(metadata: types.AiChatMessagesGetAllApiV5AiChatMessagesGetMetadataParam): Promise<FetchResponse<200, types.AiChatMessagesGetAllApiV5AiChatMessagesGetResponse200>>;
    /**
     * Create a new message in a specific thread.
     *
     * @summary Create a new chat message in a thread
     * @throws FetchError<422, types.AiChatMessagesCreateApiV5AiChatMessagesPostResponse422> Validation Error
     */
    ai_chat_messages_create_api_v5_ai_chat_messages__post(body: types.AiChatMessagesCreateApiV5AiChatMessagesPostBodyParam): Promise<FetchResponse<201, types.AiChatMessagesCreateApiV5AiChatMessagesPostResponse201>>;
    /**
     * Delete a specific chat message.
     *
     * @summary Delete a chat message
     * @throws FetchError<422, types.AiChatMessagesDeleteApiV5AiChatMessagesMessageIdDeleteResponse422> Validation Error
     */
    ai_chat_messages_delete_api_v5_ai_chat_messages__message_id__delete(metadata: types.AiChatMessagesDeleteApiV5AiChatMessagesMessageIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Create a new message in a specific thread.
     *
     * @summary Get text from audio
     * @throws FetchError<422, types.AiChatMessagesAudioApiV5AiChatMessagesAudioPostResponse422> Validation Error
     */
    ai_chat_messages_audio_api_v5_ai_chat_messages_audio_post(body: types.AiChatMessagesAudioApiV5AiChatMessagesAudioPostBodyParam, metadata?: types.AiChatMessagesAudioApiV5AiChatMessagesAudioPostMetadataParam): Promise<FetchResponse<201, types.AiChatMessagesAudioApiV5AiChatMessagesAudioPostResponse201>>;
    /**
     * Create a new chat message in a thread
     *
     * @throws FetchError<422, types.AiChatMessagesFeedbacksCreateApiV5AiChatFeedbacksPostResponse422> Validation Error
     */
    ai_chat_messages_feedbacks_create_api_v5_ai_chat_feedbacks__post(body: types.AiChatMessagesFeedbacksCreateApiV5AiChatFeedbacksPostBodyParam): Promise<FetchResponse<201, types.AiChatMessagesFeedbacksCreateApiV5AiChatFeedbacksPostResponse201>>;
    /**
     * endpoint to be called by the load balancer for healthcheck
     *
     * @summary Healthcheck
     */
    healthcheck_api_v5_health__get(): Promise<FetchResponse<200, types.HealthcheckApiV5HealthGetResponse200>>;
    /**
     * Get measurement logs for the specified measurement key and date interval
     *
     * @summary Get measurement logs
     * @throws FetchError<422, types.MeasurementsLogsGetAllApiV5MeasurementsLogsGetResponse422> Validation Error
     */
    measurements_logs_get_all_api_v5_measurements_logs__get(metadata: types.MeasurementsLogsGetAllApiV5MeasurementsLogsGetMetadataParam): Promise<FetchResponse<200, types.MeasurementsLogsGetAllApiV5MeasurementsLogsGetResponse200>>;
    /**
     * Create multiple measurement logs
     *
     * @summary Create multiple measurement logs
     * @throws FetchError<422, types.MeasurementsLogsCreateMultipleApiV5MeasurementsLogsPostResponse422> Validation Error
     */
    measurements_logs_create_multiple_api_v5_measurements_logs__post(body: types.MeasurementsLogsCreateMultipleApiV5MeasurementsLogsPostBodyParam): Promise<FetchResponse<201, types.MeasurementsLogsCreateMultipleApiV5MeasurementsLogsPostResponse201>>;
    /**
     * Update measurement log
     *
     * @summary Update measurement log
     * @throws FetchError<422, types.MeasurementsLogsUpdateApiV5MeasurementsLogsMeasurementLogIdPutResponse422> Validation Error
     */
    measurements_logs_update_api_v5_measurements_logs__measurement_log_id__put(body: types.MeasurementsLogsUpdateApiV5MeasurementsLogsMeasurementLogIdPutBodyParam, metadata: types.MeasurementsLogsUpdateApiV5MeasurementsLogsMeasurementLogIdPutMetadataParam): Promise<FetchResponse<200, types.MeasurementsLogsUpdateApiV5MeasurementsLogsMeasurementLogIdPutResponse200>>;
    /**
     * Create multiple measurement logs
     *
     * @summary Create multiple measurement logs
     * @throws FetchError<422, types.MeasurementsLogsDeleteApiV5MeasurementsLogsMeasurementLogIdDeleteResponse422> Validation Error
     */
    measurements_logs_delete_api_v5_measurements_logs__measurement_log_id__delete(metadata: types.MeasurementsLogsDeleteApiV5MeasurementsLogsMeasurementLogIdDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get Not Found Page
     *
     */
    get_not_found_page_404_get(): Promise<FetchResponse<200, types.GetNotFoundPage404GetResponse200>>;
    /**
     * Get Internal Server Error Page
     *
     */
    get_internal_server_error_page_500_get(): Promise<FetchResponse<200, types.GetInternalServerErrorPage500GetResponse200>>;
    /**
     * Get Open Api Endpoint
     *
     */
    get_open_api_endpoint_api_v5_secure_openapi_json_get(): Promise<FetchResponse<200, types.GetOpenApiEndpointApiV5SecureOpenapiJsonGetResponse200>>;
    /**
     * Get Documentation
     *
     */
    get_documentation_api_v5_secure_docs_get(): Promise<FetchResponse<200, types.GetDocumentationApiV5SecureDocsGetResponse200>>;
    /**
     * Get Apple App Site Association
     *
     */
    get_apple_app_site_association__well_known_apple_app_site_association_get(): Promise<FetchResponse<number, unknown>>;
    /**
     * Get Assetslinks For Android
     *
     */
    get_assetslinks_for_android__well_known_assetlinks_json_get(): Promise<FetchResponse<number, unknown>>;
    /**
     * Get Home Page
     *
     */
    get_home_page_home_get(): Promise<FetchResponse<200, types.GetHomePageHomeGetResponse200>>;
    /**
     * Get Readme Docs
     *
     */
    get_readme_docs_docs_get(): Promise<FetchResponse<200, types.GetReadmeDocsDocsGetResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
