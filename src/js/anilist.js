export function executeQuery(query, variables) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

  return fetch("https://graphql.anilist.co", options).then((x) => x.json());
}

export const AnilistQueries = new (class {
  searchQuery(perPage = 50) {
    return `
    query ($page: Int = 1, $id: Int, $type: MediaType, $isAdult: Boolean = false, $search: String, $format: [MediaFormat], $status: MediaStatus, $countryOfOrigin: CountryCode, $source: MediaSource, $season: MediaSeason, $seasonYear: Int, $year: String, $onList: Boolean, $yearLesser: FuzzyDateInt, $yearGreater: FuzzyDateInt, $episodeLesser: Int, $episodeGreater: Int, $durationLesser: Int, $durationGreater: Int, $chapterLesser: Int, $chapterGreater: Int, $volumeLesser: Int, $volumeGreater: Int, $licensedBy: [String], $isLicensed: Boolean, $genres: [String], $excludedGenres: [String], $tags: [String], $excludedTags: [String], $minimumTagRank: Int, $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]) {
      Page(page: $page, perPage: ${perPage}) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        media(id: $id, type: $type, season: $season, format_in: $format, status: $status, countryOfOrigin: $countryOfOrigin, source: $source, search: $search, onList: $onList, seasonYear: $seasonYear, startDate_like: $year, startDate_lesser: $yearLesser, startDate_greater: $yearGreater, episodes_lesser: $episodeLesser, episodes_greater: $episodeGreater, duration_lesser: $durationLesser, duration_greater: $durationGreater, chapters_lesser: $chapterLesser, chapters_greater: $chapterGreater, volumes_lesser: $volumeLesser, volumes_greater: $volumeGreater, licensedBy_in: $licensedBy, isLicensed: $isLicensed, genre_in: $genres, genre_not_in: $excludedGenres, tag_in: $tags, tag_not_in: $excludedTags, minimumTagRank: $minimumTagRank, sort: $sort, isAdult: $isAdult) {
          id
          isAdult
          status
          chapters
          episodes
          nextAiringEpisode {
            episode
          }
          type
          meanScore
          isFavourite
          bannerImage
          coverImage {
            large
            extraLarge
          }
          title {
            english
            romaji
            userPreferred
          }
          mediaListEntry {
            progress
            score(format: POINT_100)
            status
          }
        }
      }
    }
    `;
  }

  recentlyUpdated = `{
  	Page(page: 1, perPage: 50){
  		pageInfo{
  			hasNextPage
  			total
  		}
  		airingSchedules(
  			airingAt_greater: 0,
  			airingAt_lesser: ${Math.floor(Date.now() / 1000)},
  			sort: TIME_DESC
  		){
  			media{
  				id
  				status
  				chapters
  				episodes
  				nextAiringEpisode{
  					episode
  				}
  				isAdult
  				type
  				meanScore
  				isFavourite
  				bannerImage
  				countryOfOrigin
  				coverImage{
  					large
  				}
  				title{
  					english
  					romaji
  					userPreferred
  				}
  				mediaListEntry{
  					progress
  					score(format: POINT_100)
  					status
  				}
  			}
  		}
  	}
  }`;
})();
