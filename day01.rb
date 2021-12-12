file = *File.open("input.txt").map(&:to_i)

part1 = -> (arr) { arr.select.with_index { |x,i| x > arr[i-1]}.size }
part2 = -> { 
    sum = []
    (0..file.size-3).each { |i| sum.append(file[i...i+3].sum) }
    part1.call(sum)
}

puts "Part one: #{part1.call(file)}"
puts "Part two: #{part2.call}"