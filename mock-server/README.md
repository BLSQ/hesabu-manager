`/api/project` => Returns the information on the current project

`/api/sets` => Returns all sets available in the project
`/api/sets/1` => Returns all info for a specific set

`/api/compounds` => Returns all compounds available in the project
`/api/compounds/1` => Returns all info for a specific compound

`/api/simulations` => Returns all ran simulations

You can access using simulation id (which is unique):

`/api/simulations/1` => Normal result
`/api/simulations/2` => Normal result (but different period)
`/api/simulations/3` => Error: Could not connect to DHIS2

Or you can access them by referencing the `org_unit` and `period` directly, which will not always return the exact same simulation instance, but will always return the simulation for that period and org unit. (So the ID one is stuck in time, this one is always the most recently ran one.)

`/api/simulation?orgUnit=AOsKyLAjVWH&periods=2016Q1` => Normal result
`/api/simulation?orgUnit=BOsKyLAjVWH&periods=2019Q2` => Normal result
`/api/simulation?orgUnit=COsKyLAjVWH&periods=2018Q1` => Error: Could not connect to DHIS2

If you try and fetch an org unit with a period that's not run, you'll get a 404.

`/api/org_units` => Returns all org units
`/api/org_units?term=arab` => returns all org units matching that term
`/api/org_units?id=Rp268JB6Ne4` => returns all org units matching that id
