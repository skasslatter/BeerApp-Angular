
<h2>My solution</h2>
<h3>Provide one or multiple examples of code that you’re proud of and explain why</h2>
<ul>
<li><p><a href='https://gitlab.pxlwidgets.com/pxl.widgets-heroes/assignments/blob/block1_sybille/beerApp/src/app/components/pagination/pagination.component.ts'>Pagination</a></p>
<ul>
<li>It was challenging as it was the first component I created in Angular. I found many issues (e.g. to display the correct numbers) and corner cases. Now I am happy that it&#39;s finally working as expected.</li>

</ul>
</li>
<li><p><a href='https://gitlab.pxlwidgets.com/pxl.widgets-heroes/assignments/blob/block1_sybille/beerApp/proxy.conf.js'>Proxy</a></p>
<ul>
<li>It was the first time I used something like this. I like that I didn&#39;t  run into CORS issues and didn&#39;t have to create a backend. But it was challenging to set up the correct configuration.</li>

</ul>
</li>
<li><p><a href='https://gitlab.pxlwidgets.com/pxl.widgets-heroes/assignments/tree/block1_sybille/beerApp/src/app/components/loading'>Loading spinner component</a> </p>
<ul>
<li>Not so technical, but I find the spinning beer icons quite entertaining.</li>

</ul>
</li>

</ul>
<h3>Provide one or multiple examples of code that you’re NOT proud of and explain why</h3>
<ul>
<li><p><a href='https://gitlab.pxlwidgets.com/pxl.widgets-heroes/assignments/blob/block1_sybille/beerApp/src/app/pages/brewery/brewery-list/brewery-list.component.ts'>the Filter function in the Brewery List page → filterBreweriesByCountry()</a></p>
<ul>
<li>I would like to refactor it as it was not immediately comprehensible. I would map locations to displayName, then see if countryName is included. And maybe I would move the filter function into a service.</li>

</ul>
</li>
<li><p>The basics at the beginning: File structure, naming of variables, Duplicate CSS</p>
</li>

</ul>
<p>&nbsp;</p>
<h3>What are some ways you would like to improve the application if you had time?</h3>
<ul>
<li>create a service for the filter functions</li>
<li>refactor the filter function in the Brewery List page</li>
<li>create .env file for the API key</li>
<li>restructure CSS (create global variables)</li>

</ul>
<h3>What issues did you run into and how did you solve them?</h3>
<ul>
<li><p>The initial set up/structure of the project</p>
</li>
<li><p>Ng bootstrap was not working with latest Angular version, so I used normal Bootstrap instead</p>
</li>
<li><p>Pagination component</p>
<ul>
<li>displaying negative numbers if pageCount &lt; 5</li>
<li>displaying additional numbers if pageCount &lt; 5</li>
<li>displaying n-th page of all Beers instead of Fitered Beers</li>
<li>didn&#39;t reset current page when switching search</li>

</ul>
</li>
<li><p>Declaring the types, especially for functions. In the future I will add them as soon as I declare the function, not afterwards</p>
</li>

</ul>
<h3>Research topics</h3>
<h3>What topics did you come across that you particularly liked or found interesting?</h3>
<ul>
<li>Types in Typescript, especially for the autocomplete function if declared correctly</li>

</ul>
<h3>What topics did you come across that you’d like to learn more about?</h3>
<ul>
<li>different kinds of Observables </li>
<li>Global state → e.g. to retain Data when navigating back</li>

</ul>
<h3>Assignment</h3>
<h3>What did you like about the assignment?</h3>
<ul>
<li>Learning by doing with a concrete assignment </li>
<li>it was useful to have it already done in React and get a direct comparision between the two frameworks</li>
<li>familiar API</li>

</ul>
<h3>What didn’t you like about the assignment?</h3>
<ul>
<li>API (e.g. beer name only searchable with exact name match, beers not searchable by country, styles without actual beers, beers/breweries with missing information etc.) </li>
<li>Beer list search/filter assignments, as not possible without pre-loading the data</li>

</ul>
<h3>Workflow</h3>
<h3>Do you think we briefed you sufficiently?</h3>
<ul>
<li>yes, but some guidance on which parts of the Angular University to focus on would have been nice</li>

</ul>
<h3>Did you have enough support from your buddies while working on the assignment?</h3>
<ul>
<li>Yes</li>

</ul>

