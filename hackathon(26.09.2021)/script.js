// JavaScript code
const getAnimeList = async (search) => {
    let response = await fetch(`https://api.jikan.moe/v3/search/anime?q=${search}`, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(err => {
            return err
        })

    return response ? response?.results : []
}


const search = async () => {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();

    const div = document.getElementById('div1')
    div.innerHTML = ''

    try {
        let response = await getAnimeList(input)

        //=> if response comes
        if (response.length) {
            for (let obj of response) {
                let { title, image_url, start_date, end_date, score, type } = obj

                let startDateText, endDateText, typeText, imdbScoreText, titleText, image;
                titleText = document.createElement('h2')
                titleText.innerText = title

                startDateText = document.createElement('h3')
                startDateText.innerText = 'Start Date: ' + new Date(start_date).getDate() + '-' + (new Date(start_date).getMonth() + 1) + '-' + new Date(start_date).getFullYear()

                endDateText = document.createElement('h3')
                endDateText.innerText = 'End Date: ' + new Date(end_date).getDate() + '-' + (new Date(end_date).getMonth() + 1) + '-' + new Date(end_date).getFullYear()

                typeText = document.createElement('h3')
                typeText.innerText = 'Type: ' + type

                imdbScoreText = document.createElement('h3')
                imdbScoreText.innerText = 'IMDB Rating: ' + score

                image = document.createElement('img')
                image.src = image_url
                image.className = 'imageStyle'

                let tempDiv = document.createElement('div')
                let tempDiv1 = document.createElement('div')
                // imgDiv.style.alignItems = 'center'
                // imgDiv.style.justifyContent = 'center'

                tempDiv1.className = 'col-md-4 col-sm-12'
                tempDiv.className = 'card'

                tempDiv.appendChild(titleText)
                tempDiv.appendChild(startDateText)
                tempDiv.appendChild(endDateText)
                tempDiv.appendChild(typeText)
                tempDiv.appendChild(imdbScoreText)
                tempDiv.appendChild(image)
                tempDiv.appendChild(document.createElement('br'))
                tempDiv1.appendChild(tempDiv)

                div.appendChild(tempDiv1)
            }
        } else {
            let text = document.createElement('h3')
            text.innerText = 'No results found!'
            text.className = 'error'
            div.appendChild(text)
        }
    } catch (error) {
        console.log('some error', error)
    }
}

