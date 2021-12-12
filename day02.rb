file = *File.open("input.txt")

part1 = -> {
  file = file.join
  h_pos = file.scan(/forward (\d+)/).map { |x| x[0].to_i }
  depth = file.scan(/(up|down) (\d+)/).map { |x| x[0] == "up" ? -x[1].to_i : x[1].to_i }

  depth.sum * h_pos.sum
}

part2 = -> {
  aim, h_pos, depth = 0, 0, 0
  file.split(/\n/).map(&:split).each do |dir, x|
    x = x.to_i
    if dir == "forward"
      h_pos += x
      depth += aim * x
    elsif dir == "up"
      aim -= x
    else
      aim += x
    end
  end

  return h_pos * depth
}

puts "Part one: #{part1.call}"
puts "Part two: #{part2.call}"
